import { MemberSessionRepository } from './../member/member-session.repository';
import { Injectable } from '@nestjs/common';
import { LoginResponse } from 'src/auth/login-response';
import { InvalidCredentialsException } from 'src/common/exception/invalid-credentials.exception';
import { MemberRepository } from 'src/member/member.repository';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Member } from 'src/member/member.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberSessionRepository: MemberSessionRepository,
    private readonly jwtService: JwtService,
  ) {}

  private readonly ACCESS_TOKEN_EXPIRED_MS = 60 * 60 * 1000; //1시간
  private readonly REFRESH_TOKEN_EXPIRED_MS = 10 * 24 * 60 * 60 * 1000; //10일

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const member: Pick<Member, 'id' | 'password' | 'lastAccessedAt'> | null =
      await this.memberRepository.findOne({
        where: { email },
        select: ['id', 'password', 'lastAccessedAt'],
      });
    const isPasswordValid = await compare(password, member?.password || '');
    if (!member || !isPasswordValid) {
      throw new InvalidCredentialsException(email);
    }

    // 중복 로그인이면 기존, access, refresh를 무효화한다
    // member-session을 조회해. expiredAt이 지난게 없으면 중복로그인
    const sessions = await this.memberSessionRepository.findBy({
      member: { id: member.id },
    });
    const isDuplicateLogin = sessions.some(
      (session) => session.expiredAt > new Date(),
    );

    // TODO: 타이머 구현후, 기존 로그인 기기의 타이머 기록은 삭제되어야함

    // access, refresh를 발급한다.
    const payload = { sub: member.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRED_MS / 1000,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.REFRESH_TOKEN_EXPIRED_MS / 1000,
    });

    // db에 refresh insert
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.memberSessionRepository.save({
      member: { id: member.id },
      refreshToken: hashedRefreshToken,
      expiredAt: new Date(Date.now() + this.REFRESH_TOKEN_EXPIRED_MS),
    });

    // 최초로그인판정 + 로그인 기록 업데이트
    const isFirstLogin = !member.lastAccessedAt;
    await this.memberRepository.update(member.id, {
      lastAccessedAt: new Date(),
    });

    return {
      accessToken,
      refreshToken,
      isFirstLogin,
      isDuplicateLogin,
    };
  }

  async logout() {}

  async refreshAccessToken() {}
}
