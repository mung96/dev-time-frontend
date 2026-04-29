"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpFormValues,
  SignUpFormValuesSchema,
} from "@pages/auth/signup/model/signup-form-values";
import { PATH } from "@shared/routes";
import { Button } from "@shared/ui";

import Link from "next/link";
import { FormProvider, useController, useForm } from "react-hook-form";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { EmailField } from "@pages/auth/signup/ui/email-field";
import { NicknameField } from "@pages/auth/signup/ui/nickname-field/nickname-field";
import { PasswordField } from "@pages/auth/signup/ui/password-field";
import { PasswordConfirmField } from "@pages/auth/signup/ui/password-confirm-field/password-confirm-field";
import { TermsAgreementField } from "@pages/auth/signup/ui/term-agreement-field";
import { useSignup } from "@pages/auth/signup/model/use-signup";

import { SideBanner } from "@widgets/side-banner";
import { checkEmail } from "@pages/auth/signup/api/check-email";
import { ApiError, HttpStatus } from "@shared/api";

export const SignupPage = () => {
  const methods = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      isTermsAgreementChecked: false,
    },
    resolver: zodResolver(SignUpFormValuesSchema),
    mode: "onTouched",
  });
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setError,
    formState: { isValid, errors },
  } = methods;
  const [isValidDuplicateEmail, setIsValidDuplicateEmail] = useState(false);
  const [isValidDuplicateNickname, setIsValidDuplicateNickname] =
    useState(false);

  const { mutate: signup, isPending } = useSignup();

  const isFormValid =
    isValidDuplicateEmail && isValidDuplicateNickname && isValid;

  const { field: emailField } = useController({
    control,
    name: "email",
  });

  const checkDuplicateEmail = () => {
    const email = emailField.value;
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
  };
  return (
    <div className="flex h-full">
      <SideBanner />
      <div className="flex-1 flex justify-center w-full">
        <div className="flex flex-col items-center gap-6">
          <FormProvider {...methods}>
            <form
              className="mt-[140px] w-105 flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit((data) => {
                  signup(data);
                  router.replace(PATH.LOGIN);
                })();
              }}
            >
              <h2 className="text-heading text-primary text-center">
                회원가입
              </h2>
              <fieldset className="flex flex-col gap-10">
                {/* 이메일 */}
                <EmailField
                  isValidDuplicateEmail={isValidDuplicateEmail}
                  value={emailField.value}
                  errorMessage={errors.email?.message}
                  successMessage={"사용 가능한 이메일입니다."}
                  onChange={(e) => emailField.onChange(e.target.value)}
                  isCheckDisabled={
                    !emailField.value || errors.email?.type === "invalid_format"
                  }
                  checkDuplicateEmail={checkDuplicateEmail}
                />
                {/* 닉네임 */}
                <NicknameField
                  isValidDuplicateNickname={isValidDuplicateNickname}
                  setIsValidDuplicateNickname={setIsValidDuplicateNickname}
                />
                {/* 비밀번호 */}
                <PasswordField />
                {/* 비밀번호 확인 */}
                <PasswordConfirmField />
                {/* 이용약관 */}
                <TermsAgreementField />
              </fieldset>
              <Button
                priority={"primary"}
                type="submit"
                disabled={!isFormValid || isPending}
              >
                회원가입
              </Button>
            </form>
          </FormProvider>
          <p>
            <span className="text-primary text-body font-medium">
              회원이신가요?
            </span>
            <Link
              href={PATH.LOGIN}
              className="text-primary text-body font-bold "
            >
              로그인 바로가기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
