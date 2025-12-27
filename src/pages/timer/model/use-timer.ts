import { timerQueries } from "@pages/timer/api/timer.query";
import { useUpdateTimer } from "@pages/timer/api/use-update-timer";
import { convertMsToHMS, getSplitTime, padZero } from "@pages/timer/lib/time";
import { PATH } from "@shared/routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export const useTimer = () => {
  const [elapsedMs, setElapsedMs] = useState(0); //밀리세컨드 =>TODO: 이걸 전역에서 관리해야하네
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const { mutate: updateTimer } = useUpdateTimer();
  const router = useRouter();
  const { data: timerDetail } = useQuery(timerQueries.detail());

  useEffect(() => {
    if (!timerDetail) return;

    const { splitTimes } = timerDetail;
    const initialElapsedMs = splitTimes.reduce((value, splitTime) => {
      return value + splitTime.timeSpent;
    }, 0);
    setElapsedMs(initialElapsedMs);
  }, [timerDetail]);

  // 타이머에 표시 될 시간
  const elapsedTime = useMemo(() => {
    return {
      hours: padZero(convertMsToHMS(elapsedMs).hours),
      minutes: padZero(convertMsToHMS(elapsedMs).minutes),
      seconds: padZero(convertMsToHMS(elapsedMs).seconds),
    };
  }, [elapsedMs]);

  const removeTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    if (!timerDetail) {
      router.push(PATH.TODO);
      return;
    }

    const INTERVAL = 1000;

    const startTime = Date.now();
    const updateTime = () => {
      const now = Date.now();
      const diff = now - startTime;
      setElapsedMs(elapsedMs + diff);

      // 다음 정확한 1초 시점까지 남은 시간 계산
      const nextTick = INTERVAL - (diff % INTERVAL);
      timerRef.current = setTimeout(updateTime, nextTick);
    };

    timerRef.current = setTimeout(updateTime, INTERVAL);
  };

  const pauseTimer = () => {
    removeTimer();
    updateTimer({
      timerId: timerDetail?.timerId || "",
      payload: {
        splitTimes: getSplitTime(new Date(timerDetail?.lastUpdateTime || "")),
      },
    });
  };

  return {
    elapsedTime,
    startTimer,
    pauseTimer,
    studyLogId: timerDetail?.studyLogId,
  };
};
