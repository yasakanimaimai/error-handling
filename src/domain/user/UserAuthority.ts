import { Result } from 'src/common/result';
import { DomainException } from '../exception/DomainException';

const UserAuthorityTypes = ['MANAGER', 'PART_TIME'] as const;
export type UserAuthorityType = (typeof UserAuthorityTypes)[number];

export class UserAuthority {
  private readonly _value: UserAuthorityType;

  private constructor(value: UserAuthorityType) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  public static create(value: string): Result<UserAuthority> {
    if (value && this.isCorrect(value)) {
      return Result.ok<UserAuthority>(new UserAuthority(value));
    }

    return Result.fail<UserAuthority>(
      new DomainException('Invalid user authority'),
    );
  }

  public static isCorrect(value: string): value is UserAuthorityType {
    return UserAuthorityTypes.includes(value as UserAuthorityType);
  }
}
