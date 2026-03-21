import { apiRequester } from "@shared/api/api-requester";
import { ApiPathParams, ApiResponse } from "@shared/api/openapi/helper";

type DeleteTimerPathParams = ApiPathParams<"/api/timers/{timerId}", "delete">;
type DeleteTimerResponse = ApiResponse<"/api/timers/{timerId}", "delete">;

export const deleteTimer = ({ timerId }: DeleteTimerPathParams) => {
  return apiRequester<DeleteTimerResponse>(`/api/timers/${timerId}`, {
    method: "DELETE",
  });
};
