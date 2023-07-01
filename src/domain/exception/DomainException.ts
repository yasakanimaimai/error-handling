export class DomainException extends Error {
  public statusCode: number;
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}
