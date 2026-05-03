import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/member.repository';

@Injectable()
export class AuthService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async login() {}

  async logout() {}

  async refreshAccessToken() {}
}
