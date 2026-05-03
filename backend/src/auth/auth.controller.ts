import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServiceApiResponse } from 'src/global/service-api-response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(): Promise<ServiceApiResponse<null>> {
    await this.authService.login();
    return ServiceApiResponse.success('로그인 성공');
  }

  @Post('/logout')
  async logout(): Promise<ServiceApiResponse<null>> {
    await this.authService.logout();
    return ServiceApiResponse.success('로그아웃 성공');
  }

  @Post('/refresh')
  async refreshAccessToken(): Promise<ServiceApiResponse<null>> {
    await this.authService.refreshAccessToken();
    return ServiceApiResponse.success('토큰 교체 성공');
  }
}
