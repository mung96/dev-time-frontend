"use client";
import clsx from "clsx";

interface ButtonProps extends React.ComponentProps<"button"> {}

//TODO: 임시로 버튼 인터페이스만 만들어 놓음
export const TextFieldButton = ({
  children,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "w-full h-11 px-4 py-3 rounded-sm text-primary text-small font-semibold flex-0 whitespace-nowrap relative", //기본 CSS
        "before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:rounded-sm before:transition-opacity", //hover, active시 사용
        [
          "bg-primary/10", // 기본
          "disabled:bg-gray-400 disabled:text-gray-300", // disabled
          "hover:before:opacity-100", // hover
          "active:before:opacity-100", // active
          "focus:ring-1 focus:ring-fuchsia focus:border focus:border-white", // focus
        ],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
