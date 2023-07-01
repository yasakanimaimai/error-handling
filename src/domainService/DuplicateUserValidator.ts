import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/User.entity';
import { UserRepository } from 'src/domain/interface/UserRepository.interface';

@Injectable()
export class DuplicateUserValidator {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async isDuplicate(user: User): Promise<boolean> {
    const duplicateUser = await this.userRepository.findByEmail(user.email);
    console.log({ duplicateUser });
    return !!duplicateUser;
  }
}
