"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface TextFieldProps extends React.ComponentProps<"input"> {
  label: string;
  isError?: boolean;
  button?: ReactNode;
  helperText?: ReactNode;
  className?: string;
}
export const TextField = ({
  label,
  isError,
  button,
  helperText,
  className,
  ...inputProps
}: TextFieldProps) => {
  return (
    <div className={clsx("flex flex-col gap-[8px] h-[94px]", className)}>
      <label className="text-small font-medium text-gray-600">{label}</label>
      <div className="relative">
        <div className="flex gap-3">
          <input
            className={clsx(
              "w-full h-11 flex-1 min-w-30 bg-gray-50 px-4 py-3 text-gray-600 text-body font-medium rounded-sm",
              "placeholder:text-gray-300 placeholder:text-body placeholder:font-medium", //placeholder
              "focus:text-gray-800", //focus
              isError && "border border-negative"
            )}
            {...inputProps}
          />
          {button}
        </div>

        {helperText}
      </div>
    </div>
  );
};
