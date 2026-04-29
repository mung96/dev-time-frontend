import { CHECK_EMAIL_ENDPOINT } from "@pages/auth/signup/api/check-email";
import { http, HttpResponse } from "msw";

export const checkEmailHandler = http.get(
  CHECK_EMAIL_ENDPOINT,
  ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    return HttpResponse.json({
      success: true,
      available: true,
      message: "사용 가능한 이메일입니다.",
    });
  },
);
