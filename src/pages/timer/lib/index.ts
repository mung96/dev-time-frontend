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
