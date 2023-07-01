import { Result } from 'src/common/result';
import { DomainException } from '../exception/DomainException';

export class UserName {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(value: string): Result<UserName> {
    if (!value || !this.validateUserName(value)) {
      return Result.fail<UserName>(new DomainException('Invalid user name'));
    }
    return Result.ok<UserName>(new UserName(value));
  }

  public static validateUserName(value: string): boolean {
    if (!value) {
      return false;
    }
    return true;
  }

  get value(): string {
    return this._value;
  }
}
