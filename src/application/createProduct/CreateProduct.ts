// create-product.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ProductName } from '../../domain/product/ProductName';
import { Product } from '../../domain/product/Product.entity';
import { AppException } from '../exception/AppException';
import { ProductRepository } from 'src/domain/interface/ProductRepository.interface';
import { ProductId } from 'src/domain/product/ProductId';
import { ProductCreatePermissionChecker } from 'src/domainService/ProductCreatePermissionChecker';
import { UserAuthority } from 'src/domain/user/UserAuthority';

@Injectable()
export class CreateProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: number, name: string, authority: string) {
    const UserAuthorityResult = UserAuthority.create(authority);
    if (UserAuthorityResult.isFailure) {
      throw new AppException(UserAuthorityResult.error.message);
    }

    const permissionChecker = new ProductCreatePermissionChecker(
      UserAuthorityResult.getValue(),
    );
    if (!permissionChecker.isCreatable()) {
      throw new AppException('権限が不足しています');
    }

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
