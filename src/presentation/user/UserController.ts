// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from '../../application/createUser/CreateUser';
import { AppException } from '../../application/exception/AppException';
import { DomainException } from '../../domain/exception/DomainException';

@Controller('user')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('/create')
  async create(@Body('name') name: string, @Body('email') email: string) {
    try {
      console.log({ name });
      console.log({ email });
      await this.createUserService.execute(name, email);
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
