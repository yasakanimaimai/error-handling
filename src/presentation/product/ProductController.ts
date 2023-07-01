// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateProductService } from '../../application/createProduct/CreateProduct';
import { AppException } from '../../application/exception/AppException';
import { DomainException } from '../../domain/exception/DomainException';

@Controller('product')
export class ProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post('/create')
  async create(@Body('id') id: number, @Body('name') name: string) {
    try {
      await this.createProductService.execute(id, name);
      return { status: 'success' };
    } catch (error) {
      if (error instanceof AppException) {
        // ドメインエラーに応じた適切なHTTPステータスコードを設定
        // エラーメッセージはそのままエラーから取得
        console.log(error.message);
        return { status: 'error', message: error.message };
      } else if (error instanceof DomainException) {
        console.log(error.message);
        return { status: 'error', message: error.message };
      }

      // 予期しないエラーの場合は、一般的なエラーメッセージを返す
      return { status: 'error', message: 'An unexpected error occurred' };
    }
  }
}
