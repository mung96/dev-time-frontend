import { SignupPage } from "@pages/auth/signup/ui/signup-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("회원가입 폼", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <SignupPage />
      </QueryClientProvider>,
    );
  });

  it("모든 필수 필드를 렌더링한다", () => {
    expect(screen.getByLabelText("아이디")).toBeInTheDocument();
    expect(screen.getByLabelText("닉네임")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호 확인")).toBeInTheDocument();
    expect(screen.getByLabelText("동의함")).toBeInTheDocument(); //이용약관
  });
});
