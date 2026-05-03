import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [MemberModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
