import { apiRequester } from "@shared/api/api-requester";

export const checkNickname = (nickname: string) => {
  return apiRequester<{
    success: true;
    available: true;
    message: string;
  }>(`/api/signup/check-nickname?nickname=${nickname}`, {
    method: "GET",
  });
};
