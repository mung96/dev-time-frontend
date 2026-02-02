import { timerQueries } from "@pages/timer/api/timer.query";
import { useDeleteTimer } from "@pages/timer/api/use-delete-timer";
import { useUpdateTimer } from "@pages/timer/api/use-update-timer";
import {
  calculateElapsedMs,
  convertMsToHMS,
  getStartOfDay,
  padZero,
} from "@pages/timer/lib/time";
import { useTimerStore } from "@pages/timer/model/use-timer-store";
import { PATH } from "@shared/routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

export const useTimer = () => {
  const { splitTimes, setSplitTimes, setIsRunning } = useTimerStore();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const { mutate: updateTimer } = useUpdateTimer();
  const { mutate: deleteTimer } = useDeleteTimer();
  const { data: timerDetail } = useQuery(timerQueries.detail());
  const router = useRouter();

  useEffect(() => {
    if (!timerDetail) return;
    setSplitTimes(timerDetail.splitTimes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerDetail?.splitTimes]);

  // 타이머에 표시 될 시간
  const elapsedTime = useMemo(() => {
    const elapsedMs = calculateElapsedMs(splitTimes);
    return {
      hours: padZero(convertMsToHMS(elapsedMs).hours),
      minutes: padZero(convertMsToHMS(elapsedMs).minutes),
      seconds: padZero(convertMsToHMS(elapsedMs).seconds),
    };
  }, [splitTimes]);

  // 타이머 제거
  const removeTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // 타이머 시작
  const startTimer = () => {
    if (!timerDetail) {
      router.push(PATH.TODO);
      return;
    }

    setIsRunning(true);
    const INTERVAL = 1000;

    const startTime = Date.now();
    const updateTime = () => {
      const now = Date.now();
      const diff = now - startTime;

      const today = getStartOfDay(new Date(now)).toISOString();
      const todayIndex = splitTimes.findIndex((split) => split.date === today);

      //TODO: 날짜 넘어갈 때 처리를 자세히
      const nextSplitTime =
        todayIndex !== -1
          ? splitTimes.map((split, index) =>
              index === todayIndex
                ? { ...split, timeSpent: split.timeSpent + diff }
                : split
            )
          : [
              ...splitTimes,
              {
                date: today,
                timeSpent: diff,
              },
            ];

      setSplitTimes(nextSplitTime);

      const nextTick = INTERVAL - (diff % INTERVAL);
      timerRef.current = setTimeout(updateTime, nextTick);
    };

    timerRef.current = setTimeout(updateTime, INTERVAL);
  };

  //타이머 일시 정지
  const pauseTimer = () => {
    updateTimer({
      timerId: timerDetail?.timerId || "",
      payload: {
        splitTimes: splitTimes,
      },
    });
    removeTimer();
    setIsRunning(false);
  };

  //타이머 초기화
  const resetTimer = () => {
    if (!timerDetail?.timerId) return;
    deleteTimer({
      timerId: timerDetail?.timerId,
    });

    //TODO: 클리아인트 저장된 시간 초기화
    setSplitTimes([]);
    removeTimer();
    setIsRunning(false);
  };

  return {
    elapsedTime,
    startTimer,
    pauseTimer,
    resetTimer,
    studyLogId: timerDetail?.studyLogId,
  };
};
