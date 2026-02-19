"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTimer } from "@pages/timer/api/create-timer";
import {
  createNewTodoFormValues,
  TASK_CONTENT_MAX_LENGTH,
  TODAY_GOAL_MAX_LENGTH,
  TodoFormValues,
} from "@pages/timer/model/todo-form-values.schema";
import { useTimerStore } from "@pages/timer/model/use-timer-store";
import { Button, Dialog, TextField } from "@shared/ui";
import { TextFieldButton } from "@shared/ui/input-field/text-field-button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type Task = TodoFormValues["tasks"][number];
export const CreateTodoPage = () => {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(TodoFormValues),
    defaultValues: createNewTodoFormValues(),
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
                <TodoItem
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

export const TodoItem = ({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (newTask: Task) => void;
  onDelete: () => void;
}) => {
  const [content, setContent] = useState(task.content);
  const [mode, setMode] = useState<"read" | "edit">("read");
  return (
    <div className="w-[568px] h-18 bg-primary flex items-center rounded-md px-6 py-[26px] justify-between">
      {/* 콘텐츠 부분 */}
      <div>
        {mode === "read" && (
          <p className="text-white text-body">{task.content}</p>
        )}
        {mode === "edit" && (
          <input value={content} onChange={(e) => setContent(e.target.value)} />
        )}
      </div>

      {/* 우측 */}
      <div>
        {mode === "read" && (
          <div className="flex gap-4">
            <Image
              width={24}
              height={24}
              src="/icons/edit.svg"
              alt="편집"
              onClick={() => setMode("edit")}
            />
            <Image
              width={24}
              height={24}
              onClick={onDelete}
              src="/icons/trash.svg"
              alt="삭제"
            />
          </div>
        )}

        {mode === "edit" && (
          <Image
            width={24}
            height={24}
            src="/icons/check.svg"
            alt="끝내기"
            onClick={() =>
              onEdit({
                content: content,
                isCompleted: task.isCompleted,
              })
            }
          />
        )}
      </div>
    </div>
  );
};
