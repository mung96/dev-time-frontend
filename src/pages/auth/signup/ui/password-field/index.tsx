import { TextField } from "@shared/ui/text-field";
import { useFormContext, useFormState } from "react-hook-form";

export const PasswordField = () => {
  const { control, register } = useFormContext<{
    password: string;
  }>();
  const { errors } = useFormState<{ password: string }>({
    control,
  });
  return (
    <TextField id={"password"} error={errors.password?.message}>
      <div className="flex flex-col gap-2">
        <TextField.Label>비밀번호</TextField.Label>
        <div className="flex gap-3">
          <TextField.Input
            type="password"
            {...register("password")}
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
        <TextField.HelperText />
      </div>
    </TextField>
  );
};
