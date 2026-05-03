import { ValidationException } from 'src/common/exception/validation.exception';

export class DuplicateNicknameException extends ValidationException {
  constructor(nickname: string) {
    super(`${nickname}은 이미 사용중인 닉네임입니다.`);
  }
}
