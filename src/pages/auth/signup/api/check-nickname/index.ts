import { apiRequester } from "@shared/api/api-requester";

export const checkNickname = (nickname: string) => {
  return apiRequester<{
    success: boolean;
    available: boolean;
    message: string;
  }>(`/signup/check-nickname?nickname=${nickname}`, {
    method: "GET",
  });
};
