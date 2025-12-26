export const convertMsToHMS = (milliseconds: number) => {
  const time = milliseconds / 1000;
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return { hours, minutes, seconds };
};

export const padZero = (time: number): string => {
  return time.toString().padStart(2, "0");
};

export const getSplitTime = (
  startDateTime: Date
): {
  date: string;
  timeSpent: number;
}[] => {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const now = new Date();

  // 날짜만 비교 (연, 월, 일)
  const startOfFirstDay = getStartOfDay(startDateTime);
  const startOfToday = getStartOfDay(now);

  if (startOfFirstDay.getTime() === startOfToday.getTime()) {
    return [
      {
        date: startOfFirstDay.toISOString(),
        timeSpent: getTimeSpent(startDateTime, now),
      },
    ];
  }

  const splitTimes = [];
  const startOfNextDay = addDays(startOfFirstDay, 1);

  //첫날
  splitTimes.push({
    date: startOfFirstDay.toISOString(),
    timeSpent: getTimeSpent(startDateTime, startOfNextDay),
  });

  //중간날
  let currentDay = new Date(startOfNextDay);
  while (currentDay.getTime() < startOfToday.getTime()) {
    splitTimes.push({
      date: currentDay.toISOString(),
      timeSpent: ONE_DAY_MS,
    });
    currentDay = addDays(currentDay, 1);
  }

  //마지막날
  splitTimes.push({
    date: startOfToday.toISOString(),
    timeSpent: getTimeSpent(startOfToday, now),
  });
  return splitTimes;
};

const getTimeSpent = (startDateTime: Date, endDateTime: Date) => {
  return endDateTime.getTime() - startDateTime.getTime();
};
const getStartOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};
