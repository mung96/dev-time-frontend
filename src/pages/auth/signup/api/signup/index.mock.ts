import { SIGNUP_ENDPOINT } from "@pages/auth/signup/api/signup";
import { http, HttpResponse } from "msw";

export const signupHandler = http.post(SIGNUP_ENDPOINT, ({}) => {
  return HttpResponse.json({
    success: true,
  });
});
