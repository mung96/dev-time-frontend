//TODO: lib의 파일이름을 무엇으로할까? 함수별로 파일을 분리하는게 나으려나
export const parseTime = (milliseconds: number) => {
  const time = milliseconds / 1000;
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return { hours, minutes, seconds };
};

export const timeFormat = (time: number): string => {
  if (time < 10) return "0" + time.toString();
  return time.toString();
};

export const getSplitTime = (
  startDateTime: Date
): {
  date: string;
  timeSpent: number;
}[] => {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const nowDateTime = new Date();

  // 날짜만 비교 (연, 월, 일)
  const startDate = getDateOnly(startDateTime);
  const todayStart = getDateOnly(nowDateTime);
  const isDateChange = startDate.getTime() !== todayStart.getTime();

  if (!isDateChange) {
    return [
      {
        date: startDate.toISOString(),
        timeSpent: getTimeSpent(startDateTime, nowDateTime),
      },
    ];
  }

  const splitTimes = [];
  const nextDayStart = new Date(
    startDateTime.getFullYear(),
    startDateTime.getMonth(),
    startDateTime.getDate() + 1,
    0,
    0,
    0,
    0
  );

  //첫날
  splitTimes.push({
    date: startDate.toISOString(),
    timeSpent: getTimeSpent(startDateTime, nextDayStart),
  });

  //중간날
  let currentDate = new Date(nextDayStart);
  while (currentDate.getTime() < todayStart.getTime()) {
    splitTimes.push({
      date: currentDate.toISOString(),
      timeSpent: ONE_DAY_MS,
    });
    currentDate = new Date(currentDate.getTime() + ONE_DAY_MS);
  }

  //마지막날
  splitTimes.push({
    date: todayStart.toISOString(),
    timeSpent: getTimeSpent(todayStart, nowDateTime),
  });
  return splitTimes;
};

const getTimeSpent = (startDateTime: Date, endDateTime: Date) => {
  return endDateTime.getTime() - startDateTime.getTime();
};
const getDateOnly = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
