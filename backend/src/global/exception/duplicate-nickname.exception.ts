import { ValidationException } from 'src/global/exception/validation.exception';

export class DuplicateNicknameException extends ValidationException {
  constructor(nickname: string) {
    super(`${nickname}은 이미 사용중인 이메일입니다`);
  }
}
