import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataAccessException } from 'src/common/exception/data-access.exception';
import { DuplicateEmailException } from 'src/common/exception/duplicate-email.exception';
import { DuplicateNicknameException } from 'src/common/exception/duplicate-nickname.exception';
import { Member } from 'src/member/member.entity';
import { QueryFailedError, Repository } from 'typeorm';

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
        // TODO: 타입 단언 말고 방법이 없나?
        const { code, detail } = error.driverError as {
          code: string;
          detail: string;
        };
        if (code === '23505') {
          if (detail?.includes('email'))
            throw new DuplicateEmailException(member.email);
          if (detail?.includes('nickname'))
            throw new DuplicateNicknameException(member.nickname);
        }
      }
      throw new DataAccessException(error);
    }
  }
}
