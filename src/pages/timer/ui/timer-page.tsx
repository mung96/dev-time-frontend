"use client";
import { studyLogQueries } from "@pages/timer/api/study-log.query";
import { convertMsToHMS, padZero } from "@pages/timer/lib/time";
import { useTimer } from "@pages/timer/model/use-timer";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const TimerPage = () => {
  const { time, startTimer, pauseTimer, studyLogId } = useTimer();

  const { data: studyLogDetail } = useQuery(
    studyLogQueries.detail(studyLogId || "")
  );
  const title = studyLogDetail?.todayGoal;

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
              {padZero(convertMsToHMS(time).hours)}
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
              {padZero(convertMsToHMS(time).minutes)}
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
              {padZero(convertMsToHMS(time).seconds)}
            </span>
            <span className="text-primary text-label">S E C O N D S</span>
          </div>
        </div>

        <div className="flex gap-20">
          <button className="w-25 h-25" onClick={() => startTimer()}>
            <Image width={100} height={100} src="/icons/start.svg" alt="시작" />
          </button>
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
