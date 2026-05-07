import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LogoutRequest {
  @ApiProperty({
    description: '리프레시 토큰',
    example: 'eyJhbGciOi...',
  })
  @IsNotEmpty()
  refreshToken: string;
}
