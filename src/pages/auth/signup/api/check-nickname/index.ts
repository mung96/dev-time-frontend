import { apiRequester } from "@shared/api/api-requester";

export const CHECK_NICKNAME_ENDPOINT = `/api/signup/check-nickname`;

export const checkNickname = (nickname: string) => {
  return apiRequester<{
    success: boolean;
    available: boolean;
    message: string;
  }>(`${CHECK_NICKNAME_ENDPOINT}?nickname=${nickname}`, {
    method: "GET",
  });
};
