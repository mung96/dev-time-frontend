import { cn } from "@shared/lib/tailwind";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

type HelperTextProps = VariantProps<typeof helperTextVariants> & {
  state: "success" | "error" | "informative";
  children: ReactNode;
};

const helperTextVariants = cva(["text-caption font-medium"], {
  variants: {
    state: {
      success: "text-positive",
      error: "text-negative",
      informative: "text-informative",
    },
  },
});

export const HelperText = ({ state, children }: HelperTextProps) => {
  return <span className={cn(helperTextVariants({ state }))}>{children}</span>;
};
