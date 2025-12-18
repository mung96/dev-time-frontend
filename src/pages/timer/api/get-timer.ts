import { apiRequester } from "@shared/api/api-requester";

type TimerResponse = {
  timerId: "string";
  studyLogId: "string";
  splitTimes: [
    {
      date: "2025-12-18T03:39:10.238Z";
      timeSpent: 0;
    }
  ];
  startTime: "2025-12-18T03:39:10.238Z";
  lastUpdateTime: "2025-12-18T03:39:10.238Z";
};

export const getTimer = () => {
  return apiRequester<TimerResponse>(`/api/internal/timers`, {
    method: "GET",
  });
};
