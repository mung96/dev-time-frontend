import { LoginFormValues } from "@pages/auth/login/model/login-form-values";
import { apiRequester } from "@shared/api/api-requester";

type LoginResponse = {
  success: boolean;
  message: string;
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
};
export const login = (payload: LoginFormValues) => {
  return apiRequester<LoginResponse>(`/api/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
