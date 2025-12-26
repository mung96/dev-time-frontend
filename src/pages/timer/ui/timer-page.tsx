"use client";
import { studyLogQueries } from "@pages/timer/api/study-log.query";
import { useTimer } from "@pages/timer/model/use-timer";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const TimerPage = () => {
  const { elapsedTime, startTimer, pauseTimer, studyLogId } = useTimer();

  const { data: studyLogDetail } = useQuery(
    studyLogQueries.detail(studyLogId || "")
  );
  const title = studyLogDetail?.todayGoal;

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <section className="flex flex-col gap-20 items-center">
        <p className="text-[#023E99] text-heading font-bold text-[72px]">
          {title}
        </p>
        <div className="flex gap-12 items-center">
          <TimeCard value={elapsedTime.hours} unit={"H O U R S"} />
          <TimeSeparator />
          <TimeCard value={elapsedTime.minutes} unit={"M I N U T E S"} />
          <TimeSeparator />
          <TimeCard value={elapsedTime.seconds} unit={"S E C O N D S"} />
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

const TimeCard = ({ value, unit }: { value: string; unit: string }) => {
  return (
    <div
      className="w-66 h-[298px] border border-primary flex flex-col items-center justify-center gap-6 rounded-lg"
      style={{
        background: `linear-gradient(to bottom, rgba(76, 121, 255, 0), rgba(76, 121, 255, 0.2))`,
      }}
    >
      <span className="text-9xl">{value}</span>
      <span className="text-primary text-label">{unit}</span>
    </div>
  );
};

const TimeSeparator = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="w-6 h-6 rounded-full bg-primary" />
      <div className="w-6 h-6 rounded-full bg-primary" />
    </div>
  );
};
