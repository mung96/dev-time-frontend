import { cn } from "@shared/lib/tailwind";
import { ChevronDown } from "@shared/ui/icons";
import { cva } from "class-variance-authority";
import { createContext, ReactNode, useContext, useState } from "react";

type DropdownContextType = {
  value: string;
  setValue: (v: string) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  onValueChange: (v: string) => void;
};
const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("dropdown provider 내부에서 사용해야합니다.");
  }

  return context;
};

export const Dropdown = ({
  children,
  value,
  setValue,
}: {
  children: ReactNode;
  value: string;
  setValue: (v: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onValueChange = (v: string) => {
    setValue(v);
    setIsOpen(false);
  };
  return (
    <DropdownContext.Provider
      value={{ value, isOpen, onValueChange, setIsOpen, setValue }}
    >
      <div>{children}</div>
    </DropdownContext.Provider>
  );
};

const triggerVariants = cva(
  [
    "flex items-center justify-between gap-2",
    "text-left relative w-full h-11 min-w-[147px]  bg-gray-50 px-4 py-3 text-body font-medium rounded-sm",
    "focus:text-gray-800 focus:outline-none", //focus
  ],
  {
    variants: {
      hasValue: {
        true: "text-gray-500",
        false: "text-gray-300",
      },
      isError: {
        true: ["border border-negative", "focus:border focus:border-negative"],
      },
    },
  },
);

const Label = ({ children }: { children: ReactNode }) => {
  return (
    <label className="text-small font-medium text-gray-600">{children}</label>
  );
};

const Trigger = ({ placeholder }: { placeholder: string }) => {
  const { isOpen, setIsOpen, value } = useDropdownContext();
  return (
    <button
      type="button"
      className={cn(triggerVariants({ hasValue: !!value }))}
      onClick={() => setIsOpen(!isOpen)}
    >
      {value ? value : placeholder}
      <ChevronDown
        className={cn(
          "w-6 h-6 text-indigo",
          isOpen ? "rotate-180 duration-200" : "rotate-0 duration-200",
        )}
      />
    </button>
  );
};

type Option = {
  value: string;
  label: string;
  id: string;
};

const Options = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;
  return (
    <ul className="gap-4 w-full min-w-[123px] mt-2  py-4 px-3 rounded-sm border border-gray-300 bg-white flex flex-col max-h-[340px] overflow-y-scroll">
      {children}
    </ul>
  );
};

const Option = ({ value, label, id }: Option) => {
  const { value: selectedValue, onValueChange } = useDropdownContext();
  return (
    <li
      className={cn(
        "w-full min-w-[123px] h-9 shrink-0 text-body font-medium border-b text-gray-800 border-b-gray-300",
        selectedValue === value && "text-indigo",
      )}
      id={id}
      onClick={() => onValueChange(value)}
    >
      {label}
    </li>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Options = Options;
Dropdown.Option = Option;
Dropdown.Label = Label;
