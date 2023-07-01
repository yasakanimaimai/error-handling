import { UserEmail } from './UserEmail';
import { UserName } from './UserName';

export class User {
  private readonly userName: UserName;
  private readonly userEmail: UserEmail;

  constructor(name: UserName, email: UserEmail) {
    this.userName = name;
    this.userEmail = email;
  }

  get name(): UserName {
    return this.userName;
  }

  get email(): UserEmail {
    return this.userEmail;
  }
}
