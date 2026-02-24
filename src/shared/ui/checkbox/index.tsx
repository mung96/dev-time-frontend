import clsx from "clsx";
import React from "react";

type CheckboxProps = React.ComponentProps<"input">;

export const Checkbox = ({ checked, className, ...rest }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      className={clsx(
        "w-4 h-4 appearance-none border bg-white border-primary cursor-pointer rounded-sm",
        "checked:bg-primary/10",
        "checked:bg-[url('/icons/check.svg')] checked:bg-no-repeat checked:bg-center",
        className,
      )}
      {...rest}
    />
  );
};
