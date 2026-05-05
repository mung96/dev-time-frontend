import { LoginRequest } from 'src/auth/login-request';
import { Injectable } from '@nestjs/common';
import { LoginResponse } from 'src/auth/login-response';
import { InvalidCredentialsException } from 'src/common/exception/invalid-credentials.exception';
import { MemberRepository } from 'src/member/member.repository';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Member } from 'src/member/member.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly jwtService: JwtService,
  ) {}

  private readonly ACCESS_TOKEN_EXPIRED_IN = '60m';
  private readonly REFRESH_TOKEN_EXPIRED_IN = '7d';

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const member: Pick<Member, 'id' | 'password'> | null =
      await this.memberRepository.findOne({
        where: { email },
        select: ['id', 'password'],
      });
    const isPasswordValid = await compare(password, member?.password || '');
    if (!member || !isPasswordValid) {
      throw new InvalidCredentialsException(email);
    }

    // 중복 로그인이면 기존, access, refresh를 무효화한다
    // TODO: 타이머 구현후, 기존 로그인 기기의 타이머 기록은 삭제되어야함

    // access, refresh를 발급한다.
    const payload = { sub: member.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRED_IN,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.REFRESH_TOKEN_EXPIRED_IN,
    });

    // db에 교체

    // 첫 로그인인지도 같이 담아준다.
    return {
      accessToken,
      refreshToken,
      isFirstLogin: false,
      isDuplicateLogin: false,
    };
  }

  async logout() {}

  async refreshAccessToken() {}
}
