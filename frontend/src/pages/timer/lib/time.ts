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

export const calculateElapsedMs = (
  splitTimes: { date: string; timeSpent: number }[]
): number => {
  return splitTimes.reduce((total, splitTime) => {
    return total + splitTime.timeSpent;
  }, 0);
};

export const getStartOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
