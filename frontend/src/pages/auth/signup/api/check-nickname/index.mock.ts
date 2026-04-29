import { CHECK_NICKNAME_ENDPOINT } from "@pages/auth/signup/api/check-nickname";
import { http, HttpResponse } from "msw";

export const checkNicknameHandler = http.get(
  CHECK_NICKNAME_ENDPOINT,
  ({ request }) => {
    const url = new URL(request.url);
    const nickname = url.searchParams.get("nickname");

    return HttpResponse.json({
      success: true,
      available: true,
      message: "사용 가능한 닉네임입니다.",
    });
  },
);
