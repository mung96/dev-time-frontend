import { Module } from '@nestjs/common';
import { MemberModule } from 'src/member/member.module';
import { SignupController } from 'src/signup/signup.controller';
import { SignupService } from 'src/signup/signup.service';

@Module({
  imports: [MemberModule],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
