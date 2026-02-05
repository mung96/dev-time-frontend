"use client";

import { cn } from "@shared/lib/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ priority, className, ...rest }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ priority }), className)} {...rest} />
  );
};

const buttonVariants = cva(
  [
    "w-full h-12 px-4 py-3 rounded-sm text-subtitle font-semibold relative", //기본 CSS
    "before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:rounded-sm before:transition-opacity", //hover, active시 사용
    "enabled:hover:before:opacity-100", // hover
    "enabled:active:before:opacity-100", // active
    "focus:ring-1 focus:ring-fuchsia", // focus
  ],
  {
    variants: {
      priority: {
        primary: [
          "bg-primary text-white", // 기본
          "disabled:bg-gray-400 disabled:text-gray-300", // disabled
        ],
        secondary: [
          "bg-primary/10 text-primary ", // 기본
          "disabled:bg-gray-200 disabled:text-gray-400", // disabled
        ],
        tertiary: [
          "bg-gray-50 text-primary ", // 기본
          "disabled:bg-gray-200 disabled:text-gray-400", // disabled
        ],
      },
    },
    defaultVariants: {
      priority: "primary",
    },
  }
);
