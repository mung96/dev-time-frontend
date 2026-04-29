import { apiRequester } from "@shared/api/api-requester";

export const CHECK_EMAIL_ENDPOINT = `/api/signup/check-email`;

export const checkEmail = (email: string) => {
  return apiRequester<{
    success: boolean;
    available: boolean;
    message: string;
  }>(`${CHECK_EMAIL_ENDPOINT}?email=${email}`, {
    method: "GET",
  });
};
