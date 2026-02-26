import { checkNickname } from "@pages/auth/signup/api/check-nickname";
import { ApiError, HttpStatus } from "@shared/api";
import { useFormContext, useFormState } from "react-hook-form";
import { TextField } from "@shared/ui/text-field";

type NicknameFieldProps = {
  isValidDuplicateNickname: boolean;
  setIsValidDuplicateNickname: (v: boolean) => void;
};

export const NicknameField = ({
  isValidDuplicateNickname,
  setIsValidDuplicateNickname,
}: NicknameFieldProps) => {
  const { control, register, getValues, setError } = useFormContext<{
    nickname: string;
  }>();
  const { touchedFields, errors } = useFormState<{ nickname: string }>({
    control,
  });
  return (
    <>
      <TextField
        id={"nickname"}
        error={!!touchedFields.nickname ? errors.nickname?.message : undefined}
        success={
          isValidDuplicateNickname ? "사용 가능한 닉네임입니다." : undefined
        }
      >
        <div className="flex flex-col gap-2">
          <TextField.Label>닉네임</TextField.Label>
          <div className="flex gap-3">
            <TextField.Input
              placeholder="닉네임을 입력해 주세요."
              {...register("nickname", {
                onChange: () => setIsValidDuplicateNickname(false),
              })}
            />
            <TextField.Button
              type="button"
              disabled={
                !touchedFields.nickname ||
                errors.nickname?.type === "invalid_format"
              }
              onClick={() => {
                const nickname = getValues("nickname");
                checkNickname(nickname)
                  .then((response) => {
                    if (response.available) {
                      setIsValidDuplicateNickname(true);
                    } else {
                      setError("nickname", {
                        type: "duplicate",
                        message: response.message,
                      });
                    }
                  })
                  .catch((error) => {
                    if (error instanceof ApiError) {
                      if (error.status === HttpStatus.BAD_REQUEST) {
                        setError("nickname", {
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
    </>
  );
};
