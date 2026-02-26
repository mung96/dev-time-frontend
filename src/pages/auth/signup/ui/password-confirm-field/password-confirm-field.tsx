import { TextField } from "@shared/ui/text-field";
import { useFormContext, useFormState } from "react-hook-form";

export const PasswordConfirmField = () => {
  const { control, register } = useFormContext<{
    confirmPassword: string;
  }>();
  const { errors } = useFormState<{ confirmPassword: string }>({
    control,
  });
  return (
    <TextField id={"confirmPassword"} error={errors.confirmPassword?.message}>
      <div className="flex flex-col gap-2">
        <TextField.Label>비밀번호 확인</TextField.Label>
        <div className="flex gap-3">
          <TextField.Input
            type="password"
            {...register("confirmPassword")}
            placeholder="비밀번호를 다시 입력해 주세요."
          />
        </div>
        <TextField.HelperText />
      </div>
    </TextField>
  );
};
