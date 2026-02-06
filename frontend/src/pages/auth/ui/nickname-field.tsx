import { TextFieldButton } from "@shared/ui/input-field/text-field-button";
import { checkNickname } from "@pages/auth/api/check-nickname";
import { ApiError, HttpStatus } from "@shared/api";
import { TextField as InputField } from "@shared/ui/input-field";
import { useFormContext, useFormState } from "react-hook-form";
import { HelperText } from "@shared/ui/text-field/helper-text";

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
    <InputField
      label={"닉네임"}
      placeholder="닉네임을 입력해 주세요."
      {...register("nickname", {
        onChange: () => setIsValidDuplicateNickname(false),
      })}
      button={
        <TextFieldButton
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
        </TextFieldButton>
      }
      helperText={
        <>
          {!!touchedFields.nickname ? (
            !!errors.nickname?.message ? (
              <HelperText state={"error"}>
                {errors.nickname?.message}
              </HelperText>
            ) : (
              isValidDuplicateNickname && (
                <HelperText state={"success"}>
                  사용 가능한 닉네임입니다.
                </HelperText>
              )
            )
          ) : (
            <></>
          )}
        </>
      }
      isError={!!errors.nickname?.message}
    />
  );
};
