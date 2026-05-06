import { MemberSessionRepository } from 'src/member/member-session.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginResponse } from 'src/auth/login-response';
import { InvalidCredentialsException } from 'src/common/exception/invalid-credentials.exception';
import { MemberRepository } from 'src/member/member.repository';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Member } from 'src/member/member.entity';

@Injectable()
export class AuthService {
  private readonly accessTokenExpiredSec: number;
  private readonly refreshTokenExpiredSec: number;

  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberSessionRepository: MemberSessionRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessTokenExpiredSec = Number(
      this.configService.get<number>('ACCESS_TOKEN_EXPIRED_SEC') || 0,
    );
    this.refreshTokenExpiredSec = Number(
      this.configService.get<number>('REFRESH_TOKEN_EXPIRED_SEC') || 0,
    );
  }

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

    // 중복 로그인 체크
    const sessions = await this.memberSessionRepository.findBy({
      member: { id: member.id },
    });

    const activeSessionIds = sessions
      .filter((session) => session.expiredAt > new Date())
      .map((session) => session.id);

    const isDuplicateLogin = activeSessionIds.length > 0;

    if (isDuplicateLogin) {
      await this.memberSessionRepository.softDelete(activeSessionIds);
    }

    // TODO: 타이머 구현후, 기존 로그인 기기의 타이머 기록은 삭제되어야함

    // access, refresh를 발급한다.
    const payload = { sub: member.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.accessTokenExpiredSec,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.refreshTokenExpiredSec,
    });

    // db에 refresh insert
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.memberSessionRepository.save({
      member: { id: member.id },
      refreshToken: hashedRefreshToken,
      expiredAt: new Date(Date.now() + this.refreshTokenExpiredSec * 1000),
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
