import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { DuplicateEmailException } from 'src/global/exception/duplicate-email.exception';
import { DuplicateNicknameException } from 'src/global/exception/duplicate-nickname.exception';
import { PasswordMismatchException } from 'src/global/exception/password-mismatch.exception';
import { Member } from 'src/member/member.entity';
import { SignupRequest } from 'src/signup/signup-request';
import { Repository } from 'typeorm';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async signup(signupRequest: SignupRequest): Promise<void> {
    const { email, nickname, password, confirmPassword } = signupRequest;

    // 회원가입 유효성 검사
    await this.validateSignup({ email, nickname, password, confirmPassword });

    //암호화
    const hashedPassword = await hash(password, 10);

    // 저장
    const newMember = this.memberRepository.create({
      email,
      nickname,
      password: hashedPassword,
    });
    await this.memberRepository.save(newMember);
  }

  async checkEmail(email: string): Promise<boolean> {
    const member = await this.memberRepository.findOne({
      where: {
        email,
      },
    });

    return !!member;
  }

  async checkNickname(nickname: string): Promise<boolean> {
    const member = await this.memberRepository.findOne({
      where: {
        nickname: nickname,
      },
    });

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
    //비밀번호와 비밀번호확인 일치
    if (password !== confirmPassword) {
      throw new PasswordMismatchException({ password, confirmPassword });
    }

    //이메일 중복검사
    const emailDuplicateMember = await this.memberRepository.findOne({
      where: {
        email,
      },
    });

    if (emailDuplicateMember) {
      throw new DuplicateEmailException(email);
    }

    //닉네임 중복검사
    const nicknameDuplicateMember = await this.memberRepository.findOne({
      where: {
        nickname,
      },
    });

    if (nicknameDuplicateMember) {
      throw new DuplicateNicknameException(nickname);
    }
  }
}
