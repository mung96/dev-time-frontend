"use client";
import { Button, Dialog, TextField } from "@shared/ui";
import { TextFieldButton } from "@shared/ui/text-field/text-field-button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TodoItem = { name: string };
export const CreateTodoPage = () => {
  const router = useRouter();

  const [todoName, setTodoName] = useState("");
  const [goal, setGoal] = useState("");
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    {
      name: "코딩테스트 문제 1개 풀어보기1",
    },
    {
      name: "코딩테스트 문제 1개 풀어보기2",
    },
  ]);

  return (
    <Dialog size={"sm"}>
      <form>
        <fieldset className="flex flex-col gap-6">
          <input
            placeholder="오늘의 목표"
            className="w-full h-[46px] text-heading"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <TextField
            label={"할 일 목록"}
            value={todoName}
            onChange={(e) => {
              setTodoName(e.target.value);
            }}
            button={
              <TextFieldButton
                type="button"
                onClick={() => {
                  setTodoItems([...todoItems, { name: todoName }]);
                }}
              >
                추가
              </TextFieldButton>
            }
          />

          <div className="max-h-[460px] overflow-auto">
            <ul className="flex flex-col gap-3">
              {todoItems.map((item) => (
                <TodoItem key={item.name} item={item} />
              ))}
            </ul>
          </div>
        </fieldset>

        <div className="flex gap-4">
          <Button priority={"tertiary"} onClick={() => router.back()}>
            취소
          </Button>
          <Button priority={"secondary"}>타이머 시작하기</Button>
        </div>
      </form>
    </Dialog>
  );
};

export const TodoItem = ({ item }: { item: TodoItem }) => {
  return (
    <div className="w-[568px] h-18 bg-primary flex items-center rounded-md px-6 py-[26px] justify-between">
      <p className="text-white text-body">{item.name}</p>

      <div className="flex gap-4">
        <Image width={24} height={24} src="/icons/edit.svg" alt="끝내기" />
        <Image width={24} height={24} src="/icons/trash.svg" alt="끝내기" />
      </div>
      {/* <Image width={24} height={24} src="/icons/check.svg" alt="끝내기" /> */}
    </div>
  );
};
