import * as fs from 'fs';
import { User } from 'src/domain/user/User.entity';
import { UserEmail } from 'src/domain/user/UserEmail';
import { UserRepository } from 'src/domain/user/UserRepository.interface';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export class JsonFileUserRepository implements UserRepository {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const data = await readFile(this.filePath, { encoding: 'utf-8' });
    const rowUsers = JSON.parse(data);
    console.log({ rowUsers });
    return rowUsers.find((rowUser) => rowUser.email === email.value) || null;
  }

  async save(newUser: User): Promise<void> {
    const data = await readFile(this.filePath, { encoding: 'utf-8' });
    const users = JSON.parse(data);

    // ここでデメテルの法則に違反していることの是非について
    users.push({
      name: newUser.name.value,
      email: newUser.email.value,
    });

    await writeFile(this.filePath, JSON.stringify(users), {
      encoding: 'utf-8',
    });
  }
}
