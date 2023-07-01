import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserAuthority } from './UserAuthority';

export class User {
  private readonly userName: UserName;
  private readonly userEmail: UserEmail;
  private readonly userAuthority: UserAuthority;

  constructor(name: UserName, email: UserEmail, authority: UserAuthority) {
    this.userName = name;
    this.userEmail = email;
    this.userAuthority = authority;
  }

  get name(): UserName {
    return this.userName;
  }

  get email(): UserEmail {
    return this.userEmail;
  }

  get authority(): UserAuthority {
    return this.userAuthority;
  }
}
