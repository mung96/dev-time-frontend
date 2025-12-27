import { StudyLog } from "@entities/timers/model/study-log";
import { Task } from "@entities/timers/model/task";
import z from "zod";

//TODO: 이모지 글자 길이 로직 구현해야함
export const CreateTimerFormValues = z.object({
  todayGoal: StudyLog.shape.todayGoal,
  //TODO: .min을 이미 StudyLog에 구현했는데 꼭 한번 더 써야하나...
  tasks: z.array(Task.omit({ id: true })).min(1),
});

export type CreateTimerFormValues = z.infer<typeof CreateTimerFormValues>;

export const createNewCreateTimerFormValues = (): CreateTimerFormValues => {
  return {
    todayGoal: "",
    tasks: [],
  };
};
