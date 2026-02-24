import { apiRequester } from "@shared/api/api-requester";
import { ApiRequest } from "@shared/api/openapi/helper";

export const profileCreate = (email: string) => {
  return apiRequester<{
    success: boolean;
    available: boolean;
    message: string;
  }>(`/api/profile`, {
    method: "POST",
  });
};

type ProfileCreateRequest = ApiRequest<"/api/profile", "post">;
