import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  isFirstLogin: boolean;

  @ApiProperty()
  isDuplicateLogin: boolean;
}
