import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ description: '사용자 이메일', example: 'test@tbc.com' })
  @IsNotEmpty({ message: '이메일은 필수입니다.' })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @ApiProperty({
    description: '비밀번호 (8자 이상, 영문과 숫자 조합)',
    example: 'Test1234',
  })
  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @MinLength(8, { message: '비밀번호는 8자 이상입니다.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
    message: '비밀번호는 영문과 숫자를 포함해야 합니다.',
  })
  password: string;
}
