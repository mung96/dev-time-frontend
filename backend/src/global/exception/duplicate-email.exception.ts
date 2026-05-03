import { ValidationException } from 'src/global/exception/validation.exception';

export class DuplicateEmailException extends ValidationException {
  constructor(email: string) {
    super(`${email}은 이미 사용중인 이메일입니다`);
  }
}
