import { Career } from "@pages/member/profile-create/model/career.enum";
import z from "zod";

export const ProfileCreateFormValues = z.object({
  career: z.enum(Career),
});

export type ProfileCreateFormValues = z.infer<typeof ProfileCreateFormValues>;
