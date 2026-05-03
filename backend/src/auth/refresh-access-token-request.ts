import { ApiProperty } from '@nestjs/swagger';

export class RefreshAccessTokenRequest {
  @ApiProperty({
    description: '리프레시 토큰',
    example: 'eyJhbGciOi...',
  })
  refreshToken: string;
}
