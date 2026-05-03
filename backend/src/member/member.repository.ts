import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataAccessException } from 'src/common/exception/data-access.exception';
import { DuplicateEmailException } from 'src/common/exception/duplicate-email.exception';
import { DuplicateNicknameException } from 'src/common/exception/duplicate-nickname.exception';
import { Member } from 'src/member/member.entity';
import { QueryFailedError, Repository } from 'typeorm';

const PG_UNIQUE_VIOLATION = '23505';
const UQ_MEMBER_EMAIL = 'UQ_MEMBER_EMAIL';
const UQ_MEMBER_NICKNAME = 'UQ_MEMBER_NICKNAME';

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
    try {
      await this.repository.save(member);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const { code, constraint } = error.driverError as {
          code: string;
          constraint: string;
        };
        if (code === PG_UNIQUE_VIOLATION) {
          if (constraint === UQ_MEMBER_EMAIL)
            throw new DuplicateEmailException(member.email);
          if (constraint === UQ_MEMBER_NICKNAME)
            throw new DuplicateNicknameException(member.nickname);
        }
      }
      throw new DataAccessException(error);
    }
  }
}
