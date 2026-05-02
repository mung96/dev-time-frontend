import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ServiceApiResponse } from 'src/global/service-api-response';
import { SignupRequest } from 'src/signup/signup-request';
import { SignupService } from 'src/signup/signup.service';

@Controller('api/signup')
@ApiTags('api/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signup(
    @Body() signupRequest: SignupRequest,
  ): Promise<ServiceApiResponse<null>> {
    await this.signupService.signup(signupRequest);
    return ServiceApiResponse.success('회원가입에 성공했습니다.');
  }

  @Get('/check-email')
  @ApiQuery({
    name: 'email',
    description: '확인할 이메일',
    example: 'test@example.com',
  })
  async checkEmail(@Query('email') email: string): Promise<
    ServiceApiResponse<{
      available: boolean;
    }>
  > {
    const isDuplicate = await this.signupService.checkEmail(email);
    const message = isDuplicate
      ? '이메일이 중복됩니다. 다시 입력해주세요.'
      : '사용 가능한 이메일입니다.';

    return ServiceApiResponse.success(message, {
      available: !isDuplicate,
    });
  }

  @Get('/check-nickname')
  @ApiQuery({
    name: 'nickname',
    description: '확인할 닉네임',
    example: '데품타',
  })
  async checkNickname(@Query('nickname') nickname: string): Promise<
    ServiceApiResponse<{
      available: boolean;
    }>
  > {
    const isDuplicate = await this.signupService.checkNickname(nickname);
    const message = isDuplicate
      ? '닉네임이 중복됩니다. 다시 입력해주세요'
      : '사용 가능한 닉네임입니다.';

    return ServiceApiResponse.success(message, {
      available: !isDuplicate,
    });
  }
}
