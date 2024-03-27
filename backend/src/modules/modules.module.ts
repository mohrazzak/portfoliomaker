import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserAuthModule } from './user/auth/auth.module';

@Module({
  imports: [UserModule, UserAuthModule],
  providers: [],
})
export class ModulesModule {}
