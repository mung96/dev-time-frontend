import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { DuplicateEmailException } from 'src/common/exception/duplicate-email.exception';
import { DuplicateNicknameException } from 'src/common/exception/duplicate-nickname.exception';
import { PasswordMismatchException } from 'src/common/exception/password-mismatch.exception';
import { MemberRepository } from 'src/member/member.repository';
import { SignupRequest } from 'src/signup/signup-request';

@Injectable()
export class SignupService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async signup(signupRequest: SignupRequest): Promise<void> {
    const { email, nickname, password, confirmPassword } = signupRequest;

    // 회원가입 데이터 검증
    await this.validateSignup({ email, nickname, password, confirmPassword });

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

  private async validateSignup({
    email,
    nickname,
    password,
    confirmPassword,
  }: {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
  }) {
    if (password !== confirmPassword) {
      throw new PasswordMismatchException();
    }

    const byEmail = await this.memberRepository.findByEmail(email);
    if (byEmail) throw new DuplicateEmailException(email);

    const byNickname = await this.memberRepository.findByNickname(nickname);
    if (byNickname) throw new DuplicateNicknameException(nickname);
  }
}
