export class DataAccessException extends Error {
  constructor(cause: unknown) {
    super('데이터 접근 중 오류가 발생했습니다.');
    this.name = this.constructor.name;
    this.cause = cause;
  }
}
