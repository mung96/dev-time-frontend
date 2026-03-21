import { cn } from "@shared/lib/tailwind";
import { Input } from "@shared/ui/text-field/input";
import { ComponentProps, createContext, ReactNode, useContext } from "react";

type AutoCompleteContextType = {
  value: string;
  setValue: (v: string) => void;
  isOpen: boolean;
  onValueChange: (v: string) => void;
};
const AutoCompleteContext = createContext<AutoCompleteContextType | null>(null);

const useAutoCompleteContext = () => {
  const context = useContext(AutoCompleteContext);

  if (!context) {
    throw new Error("dropdown provider 내부에서 사용해야합니다.");
  }

  return context;
};

export const AutoComplete = ({
  children,
  value,
  setValue,
}: {
  children: ReactNode;
  value: string;
  setValue: (v: string) => void;
}) => {
  const isOpen = value.length > 0;

  const onValueChange = (v: string) => {
    setValue(v);
  };
  return (
    <AutoCompleteContext.Provider
      value={{ value, isOpen, onValueChange, setValue }}
    >
      <div>{children}</div>
    </AutoCompleteContext.Provider>
  );
};

const Label = ({ children }: { children: ReactNode }) => {
  return (
    <label className="text-small font-medium text-gray-600">{children}</label>
  );
};

const AutoCompleteInput = ({
  ...props
}: Omit<ComponentProps<typeof Input>, "value" | "onChange">) => {
  const { onValueChange, value } = useAutoCompleteContext();
  return (
    <Input
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      {...props}
    />
  );
};

type Option = {
  value: string;
  label: string;
  id: string;
};

const Options = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useAutoCompleteContext();

  if (!isOpen) return null;
  //option이 검색 결과가 없으면 add item이 떠야함. 0보다 길면 검색어에 맞는것 만 떠야함
  //options를 여기서 받아야겠는데?

  return (
    <ul className="gap-4 w-full min-w-[123px] mt-2  py-4 px-3 rounded-sm border border-gray-300 bg-white flex flex-col max-h-[340px] overflow-y-scroll">
      {children}
    </ul>
  );
};

const Option = ({ value, label, id }: Option) => {
  const { value: selectedValue, onValueChange } = useAutoCompleteContext();
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

const AddNewItem = () => {
  return (
    <button
      className={cn(
        "w-full min-w-[123px] h-9 shrink-0 text-body font-medium text-gray-800 border-b-gray-300",
      )}
      onClick={() => {}}
    >
      + Add New Item
    </button>
  );
};

AutoComplete.Input = AutoCompleteInput;
AutoComplete.Options = Options;
AutoComplete.Option = Option;
AutoComplete.Label = Label;
