import { apiRequester } from "@shared/api/api-requester";
import { ApiRequest, ApiResponse } from "@shared/api/openapi/helper";

export type CreateTimerPayload = ApiRequest<"/api/timers", "post">;
export type CreateTimerResponse = ApiResponse<"/api/timers", "post", 201>;

export const createTimer = (payload: CreateTimerPayload) => {
  return apiRequester<CreateTimerResponse>(`/api/timers`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
