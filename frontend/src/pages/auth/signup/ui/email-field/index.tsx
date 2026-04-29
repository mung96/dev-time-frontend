import { TextField } from "@shared/ui/text-field";
import { ChangeEvent } from "react";

type EmailFieldProps = {
  isValidDuplicateEmail: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  successMessage?: string;
  isCheckDisabled: boolean;
  checkDuplicateEmail: () => void;
};

export const EmailField = ({
  value,
  onChange,
  errorMessage,
  isValidDuplicateEmail,
  successMessage,
  isCheckDisabled,
  checkDuplicateEmail,
}: EmailFieldProps) => {
  return (
    <TextField
      id={"id"}
      error={!!value ? errorMessage : undefined}
      success={isValidDuplicateEmail ? successMessage : undefined}
    >
      <div className="flex flex-col gap-2">
        <TextField.Label>아이디</TextField.Label>
        <div className="flex gap-3">
          <TextField.Input
            placeholder="이메일 주소 형식으로 입력해 주세요."
            value={value}
            onChange={onChange}
          />
          <TextField.Button
            aria-label="이메일 중복 확인"
            disabled={isCheckDisabled}
            onClick={() => {
              checkDuplicateEmail();
            }}
          >
            중복 확인
          </TextField.Button>
        </div>
        <TextField.HelperText />
      </div>
    </TextField>
  );
};
