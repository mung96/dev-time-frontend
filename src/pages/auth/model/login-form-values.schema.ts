import { MemberSchema } from "@entities/members/model/member";
import z from "zod";

export const LoginFormValues = z.object({
  email: MemberSchema.shape.email,
  password: MemberSchema.shape.password,
});

export type LoginFormValues = z.infer<typeof LoginFormValues>;
