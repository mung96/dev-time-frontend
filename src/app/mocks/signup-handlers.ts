import { checkEmailHandler } from "@pages/auth/signup/api/check-email/index.mock";
import { checkNicknameHandler } from "@pages/auth/signup/api/check-nickname/index.mock";
import { signupHandler } from "@pages/auth/signup/api/signup/index.mock";

export const signupHandlers = [
  checkEmailHandler,
  checkNicknameHandler,
  signupHandler,
];
