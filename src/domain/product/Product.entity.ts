import { ProductId } from './ProductId';
import { ProductName } from './ProductName';

export class Product {
  private readonly productId: ProductId;
  private readonly productName: ProductName;

  constructor(id: ProductId, name: ProductName) {
    this.productName = name;
    this.productId = id;
  }

  get id(): ProductId {
    return this.productId;
  }

  get name(): ProductName {
    return this.productName;
  }
}
