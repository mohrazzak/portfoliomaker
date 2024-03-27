import { Module } from '@nestjs/common';
import { userAuthService } from './auth.service';
import { userAuthController } from './auth.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { MailerModule } from 'src/modules/user/auth/mailer/mailer.module';
import { UserModule } from '../user.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [PrismaModule, MailerModule, UserModule, TokenModule],
  providers: [userAuthService],
  controllers: [userAuthController],
})
export class UserAuthModule {}
