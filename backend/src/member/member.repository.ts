import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/member/member.entity';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) {}

  create(data: Partial<Member>): Member {
    return this.repository.create(data);
  }

  findByEmail(email: string): Promise<Member | null> {
    return this.repository.findOne({ where: { email } });
  }

  findByNickname(nickname: string): Promise<Member | null> {
    return this.repository.findOne({ where: { nickname } });
  }

  async save(member: Member): Promise<void> {
    await this.repository.save(member);
  }
}
