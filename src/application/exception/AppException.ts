export class AppException extends Error {
  public statusCode: number;
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, AppException.prototype);
  }
}
