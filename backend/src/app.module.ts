import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  configOptions,
  filters,
  guards,
  i18nOptions,
  interceptors,
  jwtOptions,
  pipes,
} from './shared';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from './core/libs/logger/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000, // * 1 Minute.
        limit: 10,
      },
    ]),
    ConfigModule.forRoot(configOptions),
    I18nModule.forRoot(i18nOptions),
    JwtModule.registerAsync(jwtOptions),
    ModulesModule,
    LoggerModule,
    ScheduleModule.forRoot(),
  ],
  providers: [...guards, ...filters, ...pipes, ...interceptors],
})
export class AppModule {}
