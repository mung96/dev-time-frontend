import { ValidationException } from 'src/common/exception/validation.exception';

export class PasswordMismatchException extends ValidationException {
  constructor() {
    super('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
  }
}
