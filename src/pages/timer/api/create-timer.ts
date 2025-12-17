import { apiRequester } from "@shared/api/api-requester";

type CreateTimerResponse = {
  message: string;
  studyLogId: string;
  timerId: string;
  startTime: string; //dateTime
};

type CreateTimerPayload = {
  todayGoal: string;
  tasks: string[];
};
export const createTimer = (payload: CreateTimerPayload) => {
  return apiRequester<CreateTimerResponse>(`/api/internal/timers`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
