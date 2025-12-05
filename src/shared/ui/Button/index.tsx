import clsx from "clsx";

interface ButtonProps extends React.ComponentProps<"button"> {
  priority: "primary" | "secondary" | "tertiary";
}

export const Button = ({ priority, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "h-12 px-4 py-3 w-fit rounded-sm text-white text-subtitle font-semibold relative", //기본 CSS
        "before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:rounded-sm before:transition-opacity", //hover, active시 사용
        priority === "primary" && [
          "bg-primary", // 기본
          "disabled:bg-gray-400 disabled:text-gray-300", // disabled
          "hover:before:opacity-100", // hover
          "active:before:opacity-100", // active
          "focus:ring-1 focus:ring-fuchsia focus:border focus:border-white", // focus
        ],
        priority === "secondary" && [],
        priority === "tertiary" && [],
        className
      )}
      {...rest}
    />
  );
};
