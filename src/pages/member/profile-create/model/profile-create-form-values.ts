import { Career } from "@pages/member/profile-create/model/career.enum";
import { Purpose } from "@pages/member/profile-create/model/purpose.enum";
import z from "zod";

// const PurposeSchema = z.union([
//   z.enum([
//     Purpose.CAREER_CHANGE,
//     Purpose.JOB_SEEKING,
//     Purpose.SKILL_UP,
//     Purpose.WORK_PROJECT,
//   ]),
//   z.object({ type: z.literal(Purpose.OTHER), detail: z.string() }),
// ]);

const PurposeSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal(Purpose.CAREER_CHANGE) }),
  z.object({ type: z.literal(Purpose.JOB_SEEKING) }),
  z.object({ type: z.literal(Purpose.SKILL_UP) }),
  z.object({ type: z.literal(Purpose.WORK_PROJECT) }),
  z.object({ type: z.literal(Purpose.OTHER), detail: z.string() }),
]);

export const ProfileCreateFormValues = z.object({
  career: z.enum(Career).nullable(),
  purpose: PurposeSchema.nullable(),
});

export type ProfileCreateFormValues = z.infer<typeof ProfileCreateFormValues>;

export const createNewProfileCreateFormValues = (): ProfileCreateFormValues => {
  return {
    career: null,
    purpose: null,
  };
};
