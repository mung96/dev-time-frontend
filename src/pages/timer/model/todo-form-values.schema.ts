import z from "zod";

export const TODAY_GOAL_MAX_LENGTH = 30;
export const TASK_CONTENT_MAX_LENGTH = 30;

//TODO: 이모지 글자 길이 로직 구현해야함
export const TodoFormValues = z.object({
  todayGoal: z.string().min(1, "").max(TODAY_GOAL_MAX_LENGTH, ""),
  tasks: z
    .array(
      z.object({
        content: z.string().max(30, ""),
        isCompleted: z.boolean(),
      })
    )
    .min(1),
});

export type TodoFormValues = z.infer<typeof TodoFormValues>;

export const createNewTodoFormValues = (): TodoFormValues => {
  return {
    todayGoal: "",
    tasks: [],
  };
};
