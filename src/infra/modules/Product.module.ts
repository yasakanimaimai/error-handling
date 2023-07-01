// product.module.ts
import { Module } from '@nestjs/common';
import { CreateProductService } from 'src/application/createProduct/CreateProduct';
import { JsonFileProductRepository } from '../JsonFileProductRepository';
import { ProductController } from 'src/presentation/product/ProductController';

@Module({
  providers: [
    CreateProductService,
    {
      provide: 'ProductRepository',
      useValue: new JsonFileProductRepository('src/infra/db/products.json'),
    },
  ],
  controllers: [ProductController],
})
export class ProductModule {}
