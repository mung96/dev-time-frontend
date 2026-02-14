"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpFormValues,
  SignUpFormValuesSchema,
} from "@pages/auth/signup/model/signup-form-values";
import { PATH } from "@shared/routes";
import { Button } from "@shared/ui";

import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

import { useState } from "react";
import { signup } from "@pages/auth/signup/api/signup";
import { useRouter } from "next/navigation";

import { EmailField } from "@pages/auth/signup/ui/email-field";
import { NicknameField } from "@pages/auth/signup/ui/nickname-field/nickname-field";
import { PasswordField } from "@pages/auth/signup/ui/password-field";
import { PasswordConfirmField } from "@pages/auth/signup/ui/password-confirm-field/password-confirm-field";
import { TermsAgreementField } from "@pages/auth/signup/ui/term-agreement-field";

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
    formState: { isValid, isSubmitting },
  } = methods;
  const [isValidDuplicateEmail, setIsValidDuplicateEmail] = useState(false);
  const [isValidDuplicateNickname, setIsValidDuplicateNickname] =
    useState(false);

  const isFormValid =
    isValidDuplicateEmail && isValidDuplicateNickname && isValid;

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
                handleSubmit(async (data) => {
                  await signup(data);
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
                  setIsValidDuplicateEmail={setIsValidDuplicateEmail}
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
                disabled={!isFormValid || isSubmitting}
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

const SideBanner = () => {
  return (
    <div className="flex-1 bg-primary flex items-center justify-center">
      <div className="flex flex-col gap-9 items-center justify-center">
        <picture>
          <Image
            width={264}
            height={200}
            src="/images/Logo.png"
            alt="DevTime 로고"
          />
        </picture>
        <span className="text-white text-title font-semibold">
          개발자를 위한 타이머
        </span>
      </div>
    </div>
  );
};
