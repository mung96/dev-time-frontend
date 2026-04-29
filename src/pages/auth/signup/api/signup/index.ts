import { SignUpFormValues } from "../../model/signup-form-values";
import { apiRequester } from "@shared/api/api-requester";

export const SIGNUP_ENDPOINT = "/api/signup";

export const signup = (payload: SignUpFormValues) => {
  return apiRequester<{
    success: boolean;
    available: boolean;
    message: string;
  }>(SIGNUP_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
