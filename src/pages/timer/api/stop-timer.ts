import { apiRequester } from "@shared/api/api-requester";
import { ApiRequest, ApiResponse } from "@shared/api/openapi/helper";

export const stopTimer = ({
  timerId,
  payload,
}: {
  timerId: string;
  payload: StopTimerPayload;
}) => {
  return apiRequester<StopTimerResponse>(`/timers/${timerId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export type StopTimerPayload = ApiRequest<"/api/timers/{timerId}/stop", "post">;
export type StopTimerResponse = ApiResponse<
  "/api/timers/{timerId}/stop",
  "post"
>;
