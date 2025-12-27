import z from "zod";

export const TODAY_GOAL_MAX_LENGTH = 30;
export const TASK_CONTENT_MAX_LENGTH = 30;

export const StudyLog = z.object({
  studyLogId: z.string(),
  todayGoal: z.string().min(1, "").max(TODAY_GOAL_MAX_LENGTH, ""),
  studyTime: z.number(),

  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  review: z.string(),
  completionRate: z.number(),
  tasks: z
    .array(
      z.object({
        id: z.string(),
        content: z.string().max(30, ""),
        isCompleted: z.boolean(),
      })
    )
    .min(1),
});

export type StudyLog = z.infer<typeof StudyLog>;
