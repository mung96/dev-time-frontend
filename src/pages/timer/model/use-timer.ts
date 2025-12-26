import { timerQueries } from "@pages/timer/api/timer.query";
import { useUpdateTimer } from "@pages/timer/api/use-update-timer";
import { getSplitTime } from "@pages/timer/lib";
import { PATH } from "@shared/routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export const useTimer = () => {
  const [time, setTime] = useState(0); //밀리세컨드 =>TODO: 이걸 전역에서 관리해야하네
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const { mutate: updateTimer } = useUpdateTimer();
  const router = useRouter();
  const { data: timerDetail } = useQuery(timerQueries.detail());

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
      setTime(time + diff);

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
    studyLogId: timerDetail?.studyLogId,
    time,
    startTimer,
    pauseTimer,
  };
};
