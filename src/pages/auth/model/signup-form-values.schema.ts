import z from "zod";

const PASSWORD_ERROR_MESSAGE =
  "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.";

export const SignUpFormValuesSchema = z
  .object({
    email: z.email({ message: "이메일 형식으로 작성해 주세요." }),
    nickname: z.string().min(1, "닉네임을 입력해 주세요."),
    password: z
      .string()
      .min(8, { message: PASSWORD_ERROR_MESSAGE })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
        message: PASSWORD_ERROR_MESSAGE,
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
export type SignUpFormValues = z.infer<typeof SignUpFormValuesSchema>;
