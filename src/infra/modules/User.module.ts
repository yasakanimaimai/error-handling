// user.module.ts
import { Module } from '@nestjs/common';
import { CreateUserService } from 'src/application/createUser/CreateUser';
import { JsonFileUserRepository } from '../JsonFileUserRepository';
import { UserController } from 'src/presentation/user/UserController';

@Module({
  providers: [
    CreateUserService,
    {
      provide: 'UserRepository',
      useValue: new JsonFileUserRepository('src/infra/db/users.json'),
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
