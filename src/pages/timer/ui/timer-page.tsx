"use client";
import { studyLogQueries } from "@pages/timer/api/study-log.query";
import { timerQueries } from "@pages/timer/api/timer.query";
import { getSplitTime, parseTime, timeFormat } from "../lib";
import { PATH } from "@shared/routes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUpdateTimer } from "@pages/timer/api/use-update-timer";

export const TimerPage = () => {
  const [time, setTime] = useState(0); //밀리세컨드 =>TODO: 이걸 전역에서 관리해야하네

  const { data: timerDetail } = useQuery(timerQueries.detail());
  const { data: studyLogDetail } = useQuery({
    ...studyLogQueries.detail(timerDetail?.studyLogId || ""),
    enabled: !!timerDetail?.studyLogId,
  });
  const title = studyLogDetail?.todayGoal;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null); //이건 렌더링용
  const removeTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const { mutate: updateTimer } = useUpdateTimer();

  const startTimer = () => {
    if (!timerDetail?.timerId || !timerDetail?.lastUpdateTime) return;

    const INTERVAL = 1000;
    const startTime = new Date(timerDetail.lastUpdateTime).getTime();
    const updateTime = () => {
      const now = Date.now();
      const diff = now - startTime;
      setTime(diff);

      const nextTick = -(diff % INTERVAL);
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

  useEffect(() => {
    startTimer();
    return () => {
      removeTimer();
    };
  }, [timerDetail]);

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <section className="flex flex-col gap-20 items-center">
        {/* TODO: color 디자인시스템 분리 필요 */}
        <p className="text-[#023E99] text-heading font-bold text-[72px]">
          {title}
        </p>
        <div className="flex gap-12 items-center">
          <div
            className="w-66 h-[298px] border border-primary flex flex-col items-center justify-center gap-6 rounded-lg"
            style={{
              background: `linear-gradient(to bottom, rgba(76, 121, 255, 0), rgba(76, 121, 255, 0.2))`,
            }}
          >
            <span className="text-9xl">
              {timeFormat(parseTime(time).hours)}
            </span>
            <span className="text-primary text-label">H O U R S</span>
          </div>
          <div className="flex flex-col gap-16">
            <div className="w-6 h-6 rounded-full bg-primary" />
            <div className="w-6 h-6 rounded-full bg-primary" />
          </div>
          <div
            className="w-66 h-[298px] border border-primary flex flex-col items-center justify-center gap-6 rounded-lg"
            style={{
              background: `linear-gradient(to bottom, rgba(76, 121, 255, 0), rgba(76, 121, 255, 0.2))`,
            }}
          >
            <span className="text-9xl">
              {timeFormat(parseTime(time).minutes)}
            </span>
            <span className="text-primary text-label">M I N U T E S</span>
          </div>
          <div className="flex flex-col gap-16">
            <div className="w-6 h-6 rounded-full bg-primary" />
            <div className="w-6 h-6 rounded-full bg-primary" />
          </div>
          <div
            className="w-66 h-[298px] border border-primary flex flex-col items-center justify-center gap-6 rounded-lg"
            style={{
              background: `linear-gradient(to bottom, rgba(76, 121, 255, 0), rgba(76, 121, 255, 0.2))`,
            }}
          >
            <span className="text-9xl">
              {timeFormat(parseTime(time).seconds)}
            </span>
            <span className="text-primary text-label">S E C O N D S</span>
          </div>
        </div>

        <div className="flex gap-20">
          <Link className="w-25 h-25" href={PATH.TODO}>
            <Image width={100} height={100} src="/icons/start.svg" alt="시작" />
          </Link>
          <button className="w-25 h-25" onClick={() => pauseTimer()}>
            <Image width={100} height={100} src="/icons/pause.svg" alt="정지" />
          </button>
          <button className="w-25 h-25">
            <Image
              width={100}
              height={100}
              src="/icons/finish.svg"
              alt="끝내기"
            />
          </button>
        </div>
        <div>
          <button className="w-25 h-25">
            <Image
              width={48}
              height={48}
              src="/icons/TODO.svg"
              alt="todo 목록"
            />
          </button>
          <button className="w-25 h-25">
            <Image width={48} height={48} src="/icons/reset.svg" alt="초기화" />
          </button>
        </div>
      </section>
    </main>
  );
};
