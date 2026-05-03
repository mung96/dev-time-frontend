import { ValidationException } from 'src/global/exception/validation.exception';

export class PasswordMismatchException extends ValidationException {
  constructor({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }) {
    super(
      `password:${password}, passwordConfirm:${confirmPassword}은 일치하지 않습니다.`,
    );
  }
}
