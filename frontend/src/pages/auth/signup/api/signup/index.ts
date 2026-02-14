import { SignUpFormValues } from "../../model/signup-form-values";
import { apiRequester } from "@shared/api/api-requester";

export const signup = (payload: SignUpFormValues) => {
  return apiRequester<{
    success: true;
    available: true;
    message: string;
  }>(`/api/signup`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
