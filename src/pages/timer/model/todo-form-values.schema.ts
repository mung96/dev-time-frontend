import z from "zod";

export const TodoFormValues = z.object({
  todayGoal: z.string().min(1, "").max(30, ""),
  tasks: z
    .array(
      z.object({
        content: z.string(),
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
