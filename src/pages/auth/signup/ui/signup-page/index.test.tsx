import { SignupPage } from "@pages/auth/signup/ui/signup-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "@app/mocks/server";

const TEST_EMAIL = "test@example.com";
const TEST_NICKNAME = "데품타";
const TEST_PASSWORD = "abcd1234";
const TEST_CONFIRM_PASSWORD = "abcd1234";
const TEST_WRONG_CONFIRM_PASSWORD = "abc123123";

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

  //복잡한 제출 로직 테스트
  it("모든 필수 필드 입력 시 제출을 허용한다", async () => {
    const signupSpy = vi.fn();
    server.use(
      http.post("/api/signup", async ({ request }) => {
        signupSpy(await request.json());
        return HttpResponse.json({
          success: true,
          message: "회원가입이 완료되었습니다.",
        });
      }),
    );
    const user = userEvent.setup();
    expect(screen.getByRole("button", { name: "회원가입" })).toBeDisabled();

    // 이메일 검증
    await user.type(screen.getByLabelText("아이디"), TEST_EMAIL);
    await user.tab();
    await user.click(screen.getByRole("button", { name: "이메일 중복 확인" }));
    expect(
      await screen.findByText("사용 가능한 이메일입니다."),
    ).toBeInTheDocument();

    // 닉네임 검증
    await user.type(screen.getByLabelText("닉네임"), TEST_NICKNAME);
    await user.tab();
    await user.click(screen.getByRole("button", { name: "닉네임 중복 확인" }));
    expect(
      await screen.findByText("사용 가능한 닉네임입니다."),
    ).toBeInTheDocument();

    // 비밀번호, 비밀번호 확인
    await user.type(screen.getByLabelText("비밀번호"), TEST_PASSWORD);
    await user.type(
      screen.getByLabelText("비밀번호 확인"),
      TEST_CONFIRM_PASSWORD,
    );

    // 약관 동의 체크
    await user.click(screen.getByLabelText("동의함"));

    // 버튼 활성화 테스트
    expect(screen.getByRole("button", { name: "회원가입" })).toBeEnabled();

    // 제출
    await user.click(screen.getByRole("button", { name: "회원가입" }));
    await waitFor(() => {
      expect(signupSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          email: TEST_EMAIL,
          nickname: TEST_NICKNAME,
          password: TEST_PASSWORD,
          confirmPassword: TEST_CONFIRM_PASSWORD,
        }),
      );
    });
  });
  // 유효성검사 테스트

  // 조건부렌더링 테스트
});
