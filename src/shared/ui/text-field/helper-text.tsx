import clsx from "clsx";
import { ReactNode } from "react";

interface HelperTextProps {
  state: "success" | "error" | "informative";
  children: ReactNode;
}

export const HelperText = ({ state, children }: HelperTextProps) => {
  return (
    <span
      className={clsx(
        "text-caption font-medium",
        state === "success" && "text-positive",
        state === "error" && "text-negative",
        state === "informative" && "text-informative"
      )}
    >
      {children}
    </span>
  );
};
