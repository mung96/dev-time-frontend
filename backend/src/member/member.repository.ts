import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataAccessException } from 'src/common/exception/data-access.exception';
import { DuplicateEmailException } from 'src/common/exception/duplicate-email.exception';
import { DuplicateNicknameException } from 'src/common/exception/duplicate-nickname.exception';
import { Member } from 'src/member/member.entity';
import {
  DeepPartial,
  QueryFailedError,
  Repository,
  SaveOptions,
} from 'typeorm';

const MYSQL_UNIQUE_VIOLATION = 1062;
const UQ_MEMBER_EMAIL = 'UQ_MEMBER_EMAIL';
const UQ_MEMBER_NICKNAME = 'UQ_MEMBER_NICKNAME';

@Injectable()
export class MemberRepository extends Repository<Member> {
  constructor(
    @InjectRepository(Member)
    repo: Repository<Member>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  findByEmail(email: string): Promise<Member | null> {
    return this.findOne({ where: { email } });
  }

  findByNickname(nickname: string): Promise<Member | null> {
    return this.findOne({ where: { nickname } });
  }

  override save(
    entity: DeepPartial<Member>,
    options?: SaveOptions,
  ): Promise<Member>;
  override save(
    entities: DeepPartial<Member>[],
    options?: SaveOptions,
  ): Promise<Member[]>;
  override async save(
    entityOrEntities: DeepPartial<Member> | DeepPartial<Member>[],
    options?: SaveOptions,
  ): Promise<Member | Member[]> {
    try {
      if (Array.isArray(entityOrEntities)) {
        return await super.save(entityOrEntities, options);
      }
      return await super.save(entityOrEntities, options);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const { errno, sqlMessage } = error.driverError as {
          errno: number;
          sqlMessage: string;
        };
        if (errno === MYSQL_UNIQUE_VIOLATION) {
          const member = Array.isArray(entityOrEntities)
            ? entityOrEntities[0]
            : entityOrEntities;
          if (sqlMessage.includes(UQ_MEMBER_EMAIL))
            throw new DuplicateEmailException(member.email as string);
          if (sqlMessage.includes(UQ_MEMBER_NICKNAME))
            throw new DuplicateNicknameException(member.nickname as string);
        }
      }
      throw new DataAccessException(error);
    }
  }
}
