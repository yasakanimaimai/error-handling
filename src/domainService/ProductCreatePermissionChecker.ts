import { UserAuthority } from 'src/domain/user/UserAuthority';

export class ProductCreatePermissionChecker {
  constructor(private readonly userAuthority: UserAuthority) {}

  isCreatable(): boolean {
    return this.userAuthority.value === 'MANAGER';
  }
}
