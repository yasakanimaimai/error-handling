import { Module } from '@nestjs/common';
import { UserModule } from './infra/modules/User.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
