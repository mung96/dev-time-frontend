"use client";
import { TODAY_GOAL_MAX_LENGTH } from "@entities/timers/model/study-log";
import { TASK_CONTENT_MAX_LENGTH } from "@entities/timers/model/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTimer } from "@pages/timer/api/create-timer";
import {
  createNewCreateTimerFormValues,
  CreateTimerFormValues,
} from "@pages/timer/model/create-timer-form-values.schema";
import { useTimerStore } from "@pages/timer/model/use-timer-store";
import { TaskItem } from "@pages/timer/ui/task-item";
import { Button, Dialog, TextField } from "@shared/ui";
import { TextFieldButton } from "@shared/ui/text-field/text-field-button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export const CreateTimerPage = () => {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<CreateTimerFormValues>({
    resolver: zodResolver(CreateTimerFormValues),
    defaultValues: createNewCreateTimerFormValues(),
  });

  const [newTaskContent, setNewTaskContent] = useState("");
  const {
    fields: tasks,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "tasks",
  });

  const { setTimerId } = useTimerStore();
  return (
    <Dialog size={"md"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(async (data) => {
            const response = await createTimer({
              todayGoal: data.todayGoal,
              tasks: data.tasks.map((task) => task.content),
            });
            setTimerId(response.timerId);
            router.back();
          })();
        }}
      >
        <fieldset className="flex flex-col gap-6">
          <input
            placeholder="오늘의 목표"
            className="w-full h-[46px] text-heading"
            maxLength={TODAY_GOAL_MAX_LENGTH}
            {...register("todayGoal")}
          />
          <TextField
            label={"할 일 목록"}
            value={newTaskContent}
            onChange={(e) => {
              setNewTaskContent(e.target.value);
            }}
            maxLength={TASK_CONTENT_MAX_LENGTH}
            button={
              <TextFieldButton
                type="button"
                onClick={() => {
                  append({
                    content: newTaskContent,
                    isCompleted: false,
                  });
                }}
              >
                추가
              </TextFieldButton>
            }
          />

          <div className="max-h-[460px] overflow-auto">
            <ul className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={(newTask) => update(index, newTask)}
                  onDelete={() => remove(index)}
                />
              ))}
            </ul>
          </div>
        </fieldset>

        <div className="flex gap-4">
          <Button priority={"primary"} onClick={() => router.back()}>
            취소
          </Button>
          <Button disabled={!isValid || isSubmitting} priority={"primary"}>
            타이머 시작하기
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
