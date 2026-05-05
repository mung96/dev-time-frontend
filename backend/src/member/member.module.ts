import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberSession } from 'src/member/member-session.entity';
import { MemberSessionRepository } from 'src/member/member-session.repository';
import { Member } from 'src/member/member.entity';
import { MemberRepository } from 'src/member/member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member, MemberSession])],
  providers: [MemberRepository, MemberSessionRepository],
  exports: [MemberRepository, MemberSessionRepository],
})
export class MemberModule {}
