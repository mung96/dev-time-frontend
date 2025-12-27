"use client";

import { useTimerStore } from "@pages/timer/model/use-timer-store";
import { useUpdateTimer } from "@pages/timer/api/use-update-timer";
import { useEffect, useRef } from "react";

// const POLLING_INTERVAL_MS = 10 * 60 * 1000; // 10분
const POLLING_INTERVAL_MS = 5 * 1000; // TODO: 테스트용 5초

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const { isRunning, timerId, splitTimes } = useTimerStore();
  const { mutate: updateTimer } = useUpdateTimer();
  const schedulerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    console.log("isRunning", isRunning);
  }, [isRunning]);

  useEffect(() => {
    if (!timerId) return;

    //실행중이 아니면 스케줄러 삭제
    if (!isRunning) {
      if (schedulerRef.current) {
        clearInterval(schedulerRef.current);
        schedulerRef.current = null;
      }
      return;
    }

    //실행중이면 스케줄러 시작 (10분마다 업데이트)
    console.log("timer 스케줄러 실행");
    schedulerRef.current = setInterval(() => {
      updateTimer({
        timerId,
        payload: {
          splitTimes: splitTimes,
        },
      });
    }, POLLING_INTERVAL_MS);

    return () => {
      if (schedulerRef.current) {
        clearInterval(schedulerRef.current);
        schedulerRef.current = null;
      }
    };
  }, [isRunning, timerId]);

  return <>{children}</>;
}
