import { Result } from 'src/common/result';
import { DomainException } from '../exception/DomainException';

export class ProductName {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(value: string): Result<ProductName> {
    if (!value || !this.validateProductName(value)) {
      return Result.fail<ProductName>(
        new DomainException('Invalid product name'),
      );
    }
    return Result.ok<ProductName>(new ProductName(value));
  }

  public static validateProductName(value: string): boolean {
    if (!value) {
      return false;
    }
    return true;
  }

  get value(): string {
    return this._value;
  }
}
