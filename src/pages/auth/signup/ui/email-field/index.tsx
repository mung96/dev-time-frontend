import { checkEmail } from "@pages/auth/signup/api/check-email";
import { useFormContext, useFormState } from "react-hook-form";
import { TextField } from "@shared/ui/text-field";
import { ApiError, HttpStatus } from "@shared/api";

type EmailFieldProps = {
  isValidDuplicateEmail: boolean;
  setIsValidDuplicateEmail: (v: boolean) => void;
};

export const EmailField = ({
  isValidDuplicateEmail,
  setIsValidDuplicateEmail,
}: EmailFieldProps) => {
  const { control, register, getValues, setError } = useFormContext<{
    email: string;
  }>();
  const { touchedFields, errors } = useFormState<{ email: string }>({
    control,
  });
  return (
    <TextField
      id={"id"}
      error={!!touchedFields.email ? errors.email?.message : undefined}
      success={isValidDuplicateEmail ? "사용 가능한 이메일입니다." : undefined}
    >
      <div className="flex flex-col gap-2">
        <TextField.Label>아이디</TextField.Label>
        <div className="flex gap-3">
          <TextField.Input
            placeholder="이메일 주소 형식으로 입력해 주세요."
            {...register("email", {
              onChange: () => setIsValidDuplicateEmail(false),
            })}
          />
          <TextField.Button
            disabled={
              !touchedFields.email || errors.email?.type === "invalid_format"
            }
            onClick={() => {
              const email = getValues("email");
              checkEmail(email)
                .then((response) => {
                  if (response.available) {
                    setIsValidDuplicateEmail(true);
                  } else {
                    setError("email", {
                      type: "duplicate",
                      message: response.message,
                    });
                  }
                })
                .catch((error) => {
                  if (error instanceof ApiError) {
                    if (error.status === HttpStatus.BAD_REQUEST) {
                      setError("email", {
                        type: "invalid_format",
                        message: error.message,
                      });
                    }
                  }
                });
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
