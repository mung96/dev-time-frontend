"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface TextFieldProps extends React.ComponentProps<"input"> {
  label: string;
  button: ReactNode;
  helperText: ReactNode;
  className?: string;
}
export const TextField = ({
  label,
  button,
  helperText,
  className,
  ...inputProps
}: TextFieldProps) => {
  console.log(button);
  return (
    <div className={clsx("flex flex-col gap-[8px]", className)}>
      <label className="text-small font-medium text-gray-600">{label}</label>
      <div className="relative">
        <div className="flex gap-3">
          <input
            className={clsx(
              "w-full flex-1 min-w-30 bg-gray-50 px-4 py-3 text-gray-600 text-body font-medium",
              "placeholder:text-gray-300 placeholder:text-body placeholder:font-medium", //placeholder
              "focus:text-gray-800" //focus
            )}
            {...inputProps}
          />
          {button}
        </div>

        <div className="absolute -bottom-2 translate-y-full p-0 m-0">
          {helperText}
        </div>
      </div>
    </div>
  );
};
