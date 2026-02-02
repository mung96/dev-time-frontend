import { Timer } from "@entities/timers";
import { StudyLog } from "@entities/timers/model/study-log";
import { Task } from "@entities/timers/model/task";
import z from "zod";

export const StopTimerFormValues = z.object({
  review: StudyLog.shape.review,
  splitTimes: Timer.shape.splitTimes,
  tasks: z.array(Task.omit({ id: true })).min(1),
});

export type StopTimerFormValues = z.infer<typeof StopTimerFormValues>;
