import { ValidationException } from 'src/common/exception/validation.exception';

export class InvalidCredentialsException extends ValidationException {
  constructor(readonly email: string) {
    super(
      '이메일 또는 비밀번호가 올바르지 않습니다.',
      `로그인 실패 - email: ${email}`,
    );
  }
}
