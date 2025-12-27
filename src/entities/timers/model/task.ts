import z from "zod";

export const TASK_CONTENT_MAX_LENGTH = 30;

export const Task = z.object({
  id: z.string(),
  content: z.string().max(30, ""),
  isCompleted: z.boolean(),
});

export type Task = z.infer<typeof Task>;
