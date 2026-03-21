import { apiRequester } from "@shared/api/api-requester";
import { ApiRequest, ApiResponse } from "@shared/api/openapi/helper";

export const profileCreate = (request: ProfileCreateRequest) => {
  return apiRequester<ProfileCreateResponse>(`/api/profile`, {
    method: "POST",
    body: JSON.stringify(request),
  });
};

type ProfileCreateRequest = ApiRequest<"/api/profile", "post">;
type ProfileCreateResponse = ApiResponse<"/api/profile", "post">;
