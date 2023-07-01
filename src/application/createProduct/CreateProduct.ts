// create-product.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ProductName } from '../../domain/product/ProductName';
import { Product } from '../../domain/product/Product.entity';
import { AppException } from '../exception/AppException';
import { ProductRepository } from 'src/domain/interface/ProductRepository.interface';
import { ProductId } from 'src/domain/product/ProductId';

@Injectable()
export class CreateProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: number, name: string) {
    const productIdResult = ProductId.create(id);
    if (productIdResult.isFailure) {
      throw new AppException(productIdResult.error.message);
    }

    const productNameResult = ProductName.create(name);
    if (productNameResult.isFailure) {
      throw new AppException(productNameResult.error.message);
    }

    const product = new Product(
      productIdResult.getValue(),
      productNameResult.getValue(),
    );

    await this.productRepository.save(product);
  }
}
