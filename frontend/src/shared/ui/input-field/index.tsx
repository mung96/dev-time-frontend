"use client";

import { ButtonProps, Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input-field/input";
import { HelperText } from "@shared/ui/text-field/helper-text";
import { createContext, ReactNode, useContext } from "react";

type TextFieldContextType = {
  id: string; //label, input의 접근성을 위해 사용
  error?: string; //errorMessage넘기기
  success?: string; //successMessage넘기기
};

const TextFieldContext = createContext<TextFieldContextType | null>(null);

const useTextFieldContext = () => {
  const context = useContext(TextFieldContext);
  if (!context) {
    throw new Error("useTextFieldContext는 TextField와 같이 사용해야합니다.");
  }
  return context;
};

export const TextField = ({
  id,
  error,
  success,
  children,
}: Pick<TextFieldContextType, "id" | "error" | "success"> & {
  children: ReactNode;
}) => {
  return (
    <TextFieldContext.Provider value={{ id, error, success }}>
      {children}
    </TextFieldContext.Provider>
  );
};

const Label = ({ label }: { label: string }) => {
  const { id } = useTextFieldContext();

  return (
    <label htmlFor={id} className="text-small font-medium text-gray-600">
      {label}
    </label>
  );
};
const TextFieldButton = (props: ButtonProps) => {
  return <Button type="button" priority={"secondary"} {...props} />;
};

const TextFieldInput = ({ ...props }: React.ComponentProps<"input">) => {
  const { id, error } = useTextFieldContext();
  return <Input id={id} name={id} isError={!!error} {...props} />;
};

const TextFieldHelperText = () => {
  const { error, success } = useTextFieldContext();
  if (!!error) {
    return <HelperText state={"error"}>{error}</HelperText>;
  }

  return <HelperText state={"success"}>{success}</HelperText>;
};

TextField.Label = Label;
TextField.Button = TextFieldButton;
TextField.Input = TextFieldInput;
TextField.HelperText = TextFieldHelperText;
