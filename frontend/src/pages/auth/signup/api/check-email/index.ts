import { apiRequester } from "@shared/api/api-requester";

export const checkEmail = (email: string) => {
  return apiRequester<{
    success: true;
    available: true;
    message: string;
  }>(`/api/signup/check-email?email=${email}`, {
    method: "GET",
  });
};
