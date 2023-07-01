import { User } from './User.entity';
import { UserEmail } from './UserEmail';

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: UserEmail): Promise<User | null>;
}
