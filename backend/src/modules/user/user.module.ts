import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MailerModule } from './auth/mailer/mailer.module';
import { TokenModule } from './token/token.module';
import { UserEntityMapper } from './services/entity-mapper.service';

@Module({
  imports: [PrismaModule, MailerModule, TokenModule],
  controllers: [userController],
  providers: [UserService, UserEntityMapper],
  exports: [UserService, UserEntityMapper],
})
export class UserModule {}
