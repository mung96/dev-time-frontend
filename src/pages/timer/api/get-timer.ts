import { apiRequester } from "@shared/api/api-requester";
import z from "zod";

export const getTimer = async () => {
  const response = await apiRequester<TimerResponse>(`/api/internal/timers`, {
    method: "GET",
  });

  // console.dir(response);
  // const result = TimerResponse.safeParse(response);
  // if (!result.success) {
  //   throw new Error("타이머 응답 데이터 형식이 올바르지 않습니다.");
  // }
  return response;
};

export const TimerResponse = z.object({
  timerId: z.string(),
  studyLogId: z.string(),
  splitTimes: z.array(
    z.object({
      date: z.iso.datetime(),
      timeSpent: z.number(),
    })
  ),
  startTime: z.iso.datetime(),
  lastUpdateTime: z.iso.datetime(),
});

export type TimerResponse = z.infer<typeof TimerResponse>;
