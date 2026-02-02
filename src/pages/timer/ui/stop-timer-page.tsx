"use client";
import { TASK_CONTENT_MAX_LENGTH } from "@entities/timers/model/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTimerFormValues } from "@pages/timer/model/create-timer-form-values.schema";
import { StopTimerFormValues } from "@pages/timer/model/stop-timer-form-values.schema";

import { useStudyLog } from "@pages/timer/model/use-study-log";
import { useTimer } from "@pages/timer/model/use-timer";
import { TaskItem } from "@pages/timer/ui/task-item";
import { Button, Dialog, TextField } from "@shared/ui";
import { TextFieldButton } from "@shared/ui/text-field/text-field-button";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export const StopTimerPage = () => {
  const { studyLogId } = useTimer();
  const { studyLogDetail } = useStudyLog({ studyLogId: studyLogId || "" });

  const {
    control,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<StopTimerFormValues>({
    resolver: zodResolver(StopTimerFormValues),

    defaultValues: {},
  });

  useEffect(() => {}, []);
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

  return (
    <Dialog size={"md"}>
      <form onSubmit={(e) => {}}>
        <fieldset className="flex flex-col gap-6">
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
              {studyLogDetail?.tasks.map((task, index) => (
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
          <Button priority={"primary"} onClick={() => {}}>
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
