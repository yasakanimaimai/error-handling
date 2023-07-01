import { Product } from '../product/Product.entity';

export interface ProductRepository {
  save(product: Product): Promise<void>;
}
