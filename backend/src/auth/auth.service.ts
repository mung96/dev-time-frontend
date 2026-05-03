import { Injectable } from '@nestjs/common';
import { LoginResponse } from 'src/auth/login-response';
import { MemberRepository } from 'src/member/member.repository';

@Injectable()
export class AuthService {
  constructor(private readonly memberRepository: MemberRepository) {}

  login(): LoginResponse {
    return {
      accessToken: '',
      refreshToken: '',
      isFirstLogin: false,
      isDuplicateLogin: false,
    };
  }

  async logout() {}

  async refreshAccessToken() {}
}
