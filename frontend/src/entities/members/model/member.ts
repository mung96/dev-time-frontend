import z from "zod";

export const PASSWORD_ERROR_MESSAGE =
  "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.";

//TODO: 변수명에서 Schema는 제거하기
export const MemberSchema = z.object({
  email: z.email({ message: "이메일 형식으로 작성해 주세요." }),
  nickname: z.string().min(1, "닉네임을 입력해 주세요."),
  password: z
    .string()
    .min(8, { message: PASSWORD_ERROR_MESSAGE })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message: PASSWORD_ERROR_MESSAGE,
    }),
});

export type Member = z.infer<typeof MemberSchema>;
