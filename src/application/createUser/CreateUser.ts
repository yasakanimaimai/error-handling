// create-user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { UserEmail } from '../../domain/user/UserEmail';
import { UserName } from '../../domain/user/UserName';
import { User } from '../../domain/user/User.entity';
import { AppException } from '../exception/AppException';
import { UserRepository } from 'src/domain/interface/UserRepository.interface';
import { DuplicateUserValidator } from 'src/domainService/DuplicateUserValidator';
import { UserAuthority } from 'src/domain/user/UserAuthority';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(name: string, email: string, authority: string) {
    const userEmailResult = UserEmail.create(email);
    if (userEmailResult.isFailure) {
      throw new AppException(userEmailResult.error.message);
    }

    const userNameResult = UserName.create(name);
    if (userNameResult.isFailure) {
      throw new AppException(userNameResult.error.message);
    }

    const userAuthorityResult = UserAuthority.create(authority);
    if (userAuthorityResult.isFailure) {
      throw new AppException(userAuthorityResult.error.message);
    }

    const user = new User(
      userNameResult.getValue(),
      userEmailResult.getValue(),
      userAuthorityResult.getValue(),
    );

    const duplivateValidator = new DuplicateUserValidator(this.userRepository);
    const userExists = await duplivateValidator.isDuplicate(user);
    if (userExists) {
      throw new AppException('User with this email already exists');
    }

    await this.userRepository.save(user);
  }
}
