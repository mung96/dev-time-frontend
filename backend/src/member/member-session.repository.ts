import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MemberSession } from 'src/member/member-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberSessionRepository extends Repository<MemberSession> {
  constructor(
    @InjectRepository(MemberSession)
    repo: Repository<MemberSession>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }
}
