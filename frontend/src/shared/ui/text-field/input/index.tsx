import { cn } from "@shared/lib/tailwind";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

type InputProps = VariantProps<typeof InputVariants> & ComponentProps<"input">;

const InputVariants = cva(
  [
    "w-full h-11 flex-1 min-w-30 bg-gray-50 px-4 py-3 text-gray-500 text-body font-medium rounded-sm",
    "placeholder:text-gray-300 placeholder:text-body placeholder:font-medium", //placeholder
    "focus:text-gray-800 focus:outline-none", //focus
  ],
  {
    variants: {
      isError: {
        true: ["border border-negative", "focus:border focus:border-negative"],
      },
    },
  }
);

export const Input = ({ isError, className, ...props }: InputProps) => {
  return (
    <input className={cn(InputVariants({ isError }), className)} {...props} />
  );
};
