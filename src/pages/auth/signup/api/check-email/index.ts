import { apiRequester } from "@shared/api/api-requester";

export const checkEmail = (email: string) => {
  return apiRequester<{
    success: boolean;
    available: boolean;
    message: string;
  }>(`/api/signup/check-email?email=${email}`, {
    method: "GET",
  });
};
