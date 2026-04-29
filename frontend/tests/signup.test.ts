import { test, expect } from "@playwright/test";
import { PATH } from "@shared/routes";

const TEST_PASSWORD = "abcd1234";
const TEST_CONFIRM_PASSWORD = "abcd1234";

// TODO: 테스트가 왜 통과할때도 있고 아닐때도 있는거지
test.describe("회원가입 E2E 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/signup");
  });

  test("정상적인 회원가입 플로우", async ({ page }, testInfo) => {
    // 이메일, 닉네임 unique 세팅
    const uniqueId = Date.now() + testInfo.workerIndex;
    const TEST_EMAIL = `test${uniqueId}@example.com`;
    const TEST_NICKNAME = `데품타${uniqueId}`;

    // 이메일 검증
    await page.getByLabel("아이디", { exact: true }).fill(TEST_EMAIL);
    await page.keyboard.press("Tab");
    await page.getByRole("button", { name: "이메일 중복 확인" }).click();
    await expect(page.getByText("사용 가능한 이메일입니다.")).toBeVisible();

    // 닉네임 검증
    await page.getByLabel("닉네임", { exact: true }).fill(TEST_NICKNAME);
    await page.keyboard.press("Tab");
    await page.getByRole("button", { name: "닉네임 중복 확인" }).click();
    await expect(page.getByText("사용 가능한 닉네임입니다.")).toBeVisible();

    // 비밀번호, 비밀번호 확인
    await page.getByLabel("비밀번호", { exact: true }).fill(TEST_PASSWORD);
    await page
      .getByLabel("비밀번호 확인", { exact: true })
      .fill(TEST_CONFIRM_PASSWORD);

    // 약관 동의
    await page.getByLabel("동의함").click();

    // 회원가입 제출
    await expect(page.getByRole("button", { name: "회원가입" })).toBeEnabled();
    await page.getByRole("button", { name: "회원가입" }).click();

    // 로그인 페이지로 리다이렉트
    await page.waitForURL(`**${PATH.LOGIN}`);

    // 로그인 페이지로 이동하면 뒤로가기로 회원가입 페이지는 다시 갈 수 없다.
    await page.goBack();
    await page.waitForTimeout(500);
    await expect(page).not.toHaveURL(new RegExp(PATH.SIGNUP));
  });
});
