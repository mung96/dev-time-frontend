"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpFormValues,
  SignUpFormValuesSchema,
} from "@pages/auth/model/signup-form-values.schema";
import { PATH } from "@shared/routes";
import { Button } from "@shared/ui";
import { Checkbox } from "@shared/ui/checkbox";

import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

import { useState } from "react";
import { signup } from "@pages/auth/api/signup";
import { useRouter } from "next/navigation";
import { TermsService } from "@pages/auth/ui/terms-service";

import clsx from "clsx";
import { EmailField } from "@pages/auth/ui/email-field";
import { NicknameField } from "@pages/auth/ui/nickname-field";
import { PasswordField } from "@pages/auth/ui/password-field";
import { PasswordConfirmField } from "@pages/auth/ui/password-confirm-field";

export const SignupPage = () => {
  const methods = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
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

  const [isChecked, setIsChecked] = useState(false);

  const isFormValid =
    isChecked && isValidDuplicateEmail && isValidDuplicateNickname && isValid;

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
                <EmailField
                  isValidDuplicateEmail={isValidDuplicateEmail}
                  setIsValidDuplicateEmail={setIsValidDuplicateEmail}
                />

                <NicknameField
                  isValidDuplicateNickname={isValidDuplicateNickname}
                  setIsValidDuplicateNickname={setIsValidDuplicateNickname}
                />

                <PasswordField />

                <PasswordConfirmField />

                <section className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>이용약관</span>
                    <div className="flex gap-1 items-center">
                      <label
                        htmlFor="terms"
                        className={clsx(
                          "text-small text-medium text-primary/30",
                          isChecked && "text-primary/100"
                        )}
                      >
                        동의함
                      </label>
                      <Checkbox
                        id="terms"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                    </div>
                  </div>
                  <TermsService />
                </section>
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
            </span>{" "}
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
