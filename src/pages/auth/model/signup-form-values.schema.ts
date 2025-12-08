import { MemberSchema } from "@entities/members/model/member";
import z from "zod";

export const SignUpFormValuesSchema = z
  .object({
    email: MemberSchema.shape.email,
    nickname: MemberSchema.shape.nickname,
    password: MemberSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof SignUpFormValuesSchema>;
