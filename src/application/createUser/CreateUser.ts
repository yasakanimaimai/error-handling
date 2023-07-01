// create-user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { UserEmail } from '../../domain/user/UserEmail';
import { UserName } from '../../domain/user/UserName';
import { User } from '../../domain/user/User.entity';
import { AppException } from '../exception/AppException';
import { UserRepository } from 'src/domain/interface/UserRepository.interface';
import { DuplicateUserValidator } from 'src/domainService/DuplicateUserValidator';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(name: string, email: string) {
    const userEmailResult = UserEmail.create(email);
    if (userEmailResult.isFailure) {
      throw new AppException(userEmailResult.error.message);
    }

    const userNameResult = UserName.create(name);
    if (userNameResult.isFailure) {
      throw new AppException(userNameResult.error.message);
    }

    const user = new User(
      userNameResult.getValue(),
      userEmailResult.getValue(),
    );

    const duplivateValidator = new DuplicateUserValidator(this.userRepository);
    const userExists = await duplivateValidator.isDuplicate(user);
    if (userExists) {
      throw new AppException('User with this email already exists');
    }

    await this.userRepository.save(user);
  }
}
