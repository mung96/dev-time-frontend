"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { PATH } from "@shared/routes";
import { Button } from "@shared/ui";
import { TextField } from "@shared/ui/text-field";
import { HelperText } from "@shared/ui/text-field/helper-text";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { LoginFormValues } from "@pages/auth/model/login-form-values.schema";
import { useRouter } from "next/navigation";
import { login } from "@pages/auth/api/login";
export const LoginPage = () => {
  const {
    register,

    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormValues),
    mode: "onTouched",
  });

  const router = useRouter();

  return (
    <div className="flex-1 flex justify-center w-full">
      <div className="flex flex-col items-center gap-6">
        <form
          className="mt-[140px] w-105 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(async (data) => {
              const response = await login({
                ...data,
              });
              if (response.isFirstLogin) {
                router.push(PATH.PROFILE_CREATE);
              } else {
                router.push(PATH.TIMER);
              }
            })();
          }}
        >
          <h2 className="text-heading text-primary text-center">로그인</h2>
          <fieldset className="flex flex-col gap-10">
            <TextField
              label={"아이디"}
              placeholder="이메일 주소 형식으로 입력해 주세요."
              {...register("email")}
              helperText={
                <HelperText state={"error"}>{errors.email?.message}</HelperText>
              }
              isError={!!errors.email?.message}
            />

            <TextField
              label={"비밀번호"}
              type="password"
              {...register("password")}
              placeholder="비밀번호를 입력해 주세요."
              helperText={
                <HelperText state={"error"}>
                  {errors.password?.message}
                </HelperText>
              }
              isError={!!errors.password?.message}
            />
          </fieldset>
          <Button priority={"primary"} type="submit">
            로그인
          </Button>
          {process.env.NODE_ENV === "development" && (
            <DevTool control={control} />
          )}
        </form>

        <p>
          <Link href={PATH.SIGNUP} className="text-primary text-body">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};
