import { Result } from 'src/common/result';
import { DomainException } from '../exception/DomainException';

export class UserEmail {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(value: string): Result<UserEmail> {
    if (!value || !this.validateEmailAddress(value)) {
      return Result.fail<UserEmail>(
        new DomainException('Invalid email address'),
      );
    }
    return Result.ok<UserEmail>(new UserEmail(value));
  }

  public static validateEmailAddress(value: string): boolean {
    if (!value) {
      return false;
    }
    return true;
  }

  get value(): string {
    return this._value;
  }
}
