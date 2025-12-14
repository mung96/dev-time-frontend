import { cn } from "@shared/lib/style";
import { ReactNode, useEffect, useRef } from "react";

export interface DialogProps {
  children: ReactNode;
  className?: string;
}

export const Dialog = ({ children, className }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  //TODO: 모달 배경 스크롤 방지 로직 추가

  return (
    <dialog
      className={cn(
        `bg-white p-6 rounded backdrop:bg-grey-black/50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
        className
      )}
      ref={dialogRef}
    >
      {children}
    </dialog>
  );
};
