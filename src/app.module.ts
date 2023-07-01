import { Module } from '@nestjs/common';
import { UserModule } from './infra/modules/User.module';
import { ProductModule } from './infra/modules/Product.module';

@Module({
  imports: [UserModule, ProductModule],
})
export class AppModule {}
