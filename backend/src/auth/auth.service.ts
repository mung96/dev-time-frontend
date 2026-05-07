import { MemberSession } from 'src/member/member-session.entity';
import { MemberSessionRepository } from 'src/member/member-session.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginResponse } from 'src/auth/login-response';
import { InvalidCredentialsException } from 'src/common/exception/invalid-credentials.exception';
import { MemberRepository } from 'src/member/member.repository';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Member } from 'src/member/member.entity';
import { MoreThan } from 'typeorm';

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
    const accessSec = this.configService.get<number>(
      'ACCESS_TOKEN_EXPIRED_SEC',
    );
    const refreshSec = this.configService.get<number>(
      'REFRESH_TOKEN_EXPIRED_SEC',
    );

    if (!accessSec || !refreshSec) {
      throw new Error(
        'ACCESS_TOKEN_EXPIRED_SEC, REFRESH_TOKEN_EXPIRED_SEC 환경 변수가 필요합니다.',
      );
    }

    this.accessTokenExpiredSec = Number(accessSec);
    this.refreshTokenExpiredSec = Number(refreshSec);
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
    const activeSessions = await this.memberSessionRepository.findBy({
      member: { id: member.id },
      expiredAt: MoreThan(new Date()),
    });
    const activeSessionIds = activeSessions.map((session) => session.id);

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

  async logout(memberId: number) {
    const memberSession = await this.memberSessionRepository.findBy({
      member: { id: memberId },
      expiredAt: MoreThan(new Date()),
    });

    const memberSessionIds = memberSession.map((session) => session.id);

    if (memberSessionIds.length === 0) return; // delete 멱등성을 고려하여 예외가 아닌 그냥 종료
    await this.memberSessionRepository.softDelete(memberSessionIds);
  }

  async refreshAccessToken() {}
}
