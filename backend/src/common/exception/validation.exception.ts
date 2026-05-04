export abstract class ValidationException extends Error {
  readonly logMessage?: string;

  constructor(message: string, logMessage?: string) {
    super(message);
    this.name = this.constructor.name;
    this.logMessage = logMessage;
  }
}
