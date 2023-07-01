import { User } from '../user/User.entity';
import { UserEmail } from '../user/UserEmail';

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: UserEmail): Promise<User | null>;
}
