import { Result } from 'src/common/result';
import { DomainException } from '../exception/DomainException';

export class ProductId {
  private readonly _value: number;

  private constructor(value: number) {
    this._value = value;
  }

  public static create(value: number): Result<ProductId> {
    if (!value || !this.isCorrect(value)) {
      return Result.fail<ProductId>(new DomainException('Invalid id'));
    }
    return Result.ok<ProductId>(new ProductId(value));
  }

  public static isCorrect(value: number): boolean {
    if (!value) {
      return false;
    }
    return true;
  }

  get value(): number {
    return this._value;
  }
}
