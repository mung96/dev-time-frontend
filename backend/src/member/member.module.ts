import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/member/member.entity';
import { MemberRepository } from 'src/member/member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MemberRepository],
  exports: [MemberRepository],
})
export class MemberModule {}
