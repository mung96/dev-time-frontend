"use client";
import { Task } from "@entities/timers/model/task";
import Image from "next/image";
import { useState } from "react";

export const TaskItem = ({
  task,
  onEdit,
  onDelete,
}: {
  task: Omit<Task, "id">;
  onEdit: (newTask: Omit<Task, "id">) => void;
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
