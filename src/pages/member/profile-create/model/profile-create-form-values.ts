import z from "zod";

export const ProfileCreateFormValues = z.object({});

export type ProfileCreateFormValues = z.infer<typeof ProfileCreateFormValues>;
