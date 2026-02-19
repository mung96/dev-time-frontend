import { Timer } from "@entities/timers";
import { apiRequester } from "@shared/api/api-requester";
import z from "zod";

export const updateTimer = ({
  timerId,
  payload,
}: {
  timerId: string;
  payload: UpdateTimerPayload;
}) => {
  console.log("update time");
  return apiRequester<UpdateTimerResponse & { message: string }>(
    `/api/internal/timers/${timerId}`,
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

export const UpdateTimerPayload = z.object({
  splitTimes: Timer.shape.splitTimes,
});
export type UpdateTimerPayload = z.infer<typeof UpdateTimerPayload>;
