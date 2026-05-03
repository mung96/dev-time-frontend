export abstract class ValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; //로그에 서브클래싱 Exception이 찍히도록 하기 위함
  }
}
