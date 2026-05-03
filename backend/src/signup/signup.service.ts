import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PasswordMismatchException } from 'src/common/exception/password-mismatch.exception';
import { MemberRepository } from 'src/member/member.repository';
import { SignupRequest } from 'src/signup/signup-request';

@Injectable()
export class SignupService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async signup(signupRequest: SignupRequest): Promise<void> {
    const { email, nickname, password, confirmPassword } = signupRequest;

    // 회원가입 데이터 검증
    this.validateSignup({ password, confirmPassword });

    // 비밀번호 암호화
    const hashedPassword = await hash(password, 10);

    // 회원가입
    const member = this.memberRepository.create({
      email,
      nickname,
      password: hashedPassword,
    });
    await this.memberRepository.save(member);
  }

  async checkEmail(email: string): Promise<boolean> {
    const member = await this.memberRepository.findByEmail(email);
    return !!member;
  }

  async checkNickname(nickname: string): Promise<boolean> {
    const member = await this.memberRepository.findByNickname(nickname);
    return !!member;
  }

  private validateSignup({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }) {
    if (password !== confirmPassword) {
      throw new PasswordMismatchException();
    }
  }
}
