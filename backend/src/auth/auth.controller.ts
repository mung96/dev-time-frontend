import { LoginResponse } from './login-response';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiServiceResponse } from 'src/global/api-service-response.decorator';
import { ServiceApiResponse } from 'src/global/service-api-response';
import { LoginRequest } from 'src/auth/login-request';
import { RefreshAccessTokenRequest } from 'src/auth/refresh-access-token-request';
import { RefreshAccessTokenResponse } from 'src/auth/refresh-access-token-response';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiServiceResponse(LoginResponse)
  async login(
    @Body() loginRequest: LoginRequest,
  ): Promise<ServiceApiResponse<LoginResponse>> {
    const { email, password } = loginRequest;

    const response = await this.authService.login({ email, password });

    return ServiceApiResponse.success('로그인 성공', response);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Req() req: Request): null {
    console.log(req.member);

    return null;
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
