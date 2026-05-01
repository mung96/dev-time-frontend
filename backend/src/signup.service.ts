import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Member } from 'src/member.entity';
import { SignupRequest } from 'src/signup-request';
import { Repository } from 'typeorm';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async signup(signupRequest: SignupRequest): Promise<void> {
    const { email, nickname, password, confirmPassword } = signupRequest;

    //이메일, 닉네임 중복검사
    const members = await this.memberRepository.find({
      where: [{ email }, { nickname }],
    });

    if (members.length > 0) {
      throw new BadRequestException(
        '이메일 또는 닉네임이 중복됩니다. 다시 입력해주세요',
      );
    }

    //비밀번호와 비밀번호확인 일치
    if (password !== confirmPassword) {
      throw new BadRequestException('비밀번호와 확인 값이 일치하지 않습니다.');
    }

    //암호화
    const hashedPassword = await hash(password, 10);

    const newMember = this.memberRepository.create({
      email,
      nickname,
      password: hashedPassword,
    });
    await this.memberRepository.save(newMember);
  }

  async checkEmail(email: string): Promise<boolean> {
    const member = await this.memberRepository.find({
      where: {
        email,
      },
    });

    return member.length > 0;
  }

  async checkNickname(nickname: string): Promise<boolean> {
    const member = await this.memberRepository.find({
      where: {
        nickname: nickname,
      },
    });

    const isDuplicateNickname = member.length > 0;

    return isDuplicateNickname;
  }
}
