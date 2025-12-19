import { Timer } from "@entities/timers";
import { apiRequester } from "@shared/api/api-requester";
import z from "zod";

export const updateTimer = (payload: UpdateTimerPayload) => {
  return apiRequester<UpdateTimerResponse & { message: string }>(
    `/api/internal/timers`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
};

export const UpdateTimerResponse = z.object({
  splitTimes: Timer.shape.splitTimes,
  startTime: Timer.shape.startTime,
  lastUpdateTime: Timer.shape.lastUpdateTime,
});
type UpdateTimerResponse = z.infer<typeof UpdateTimerResponse>;

const UpdateTimerPayload = z.object({
  splitTimes: Timer.shape.splitTimes,
});
type UpdateTimerPayload = z.infer<typeof UpdateTimerPayload>;
