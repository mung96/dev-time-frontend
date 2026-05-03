import { LoginResponse } from './login-response';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiServiceResponse } from 'src/global/api-service-response.decorator';
import { ServiceApiResponse } from 'src/global/service-api-response';
import { LoginRequest } from 'src/auth/login-request';
import { RefreshAccessTokenRequest } from 'src/auth/refresh-access-token-request';
import { RefreshAccessTokenResponse } from 'src/auth/refresh-access-token-response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiServiceResponse(LoginResponse)
  login(@Body() loginRequest: LoginRequest): ServiceApiResponse<LoginResponse> {
    const response = this.authService.login();
    return ServiceApiResponse.success('로그인 성공', response);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiServiceResponse()
  async logout(): Promise<ServiceApiResponse<null>> {
    await this.authService.logout();
    return ServiceApiResponse.success('로그아웃 성공');
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiServiceResponse(RefreshAccessTokenResponse)
  async refreshAccessToken(
    @Body() refreshAccessTokenRequest: RefreshAccessTokenRequest,
  ): Promise<ServiceApiResponse<null>> {
    await this.authService.refreshAccessToken();
    return ServiceApiResponse.success('토큰 교체 성공');
  }
}
