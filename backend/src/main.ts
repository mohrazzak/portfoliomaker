import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import expressBasicAuth from 'express-basic-auth';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { SwaggerModule } from '@nestjs/swagger';
import { TimeoutInterceptor, zodI18n } from './core';
import { swaggerOptions } from './shared';
import i18next from 'i18next';
import compression from 'compression';
import helmet from 'helmet';
import {
  I18nMiddleware,
  I18nValidationExceptionFilter,
  I18nValidationPipe,
} from 'nestjs-i18n';
import { HttpStatus } from '@nestjs/common';
import { LoggerService } from './core/libs/logger/logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useLogger(app.get(LoggerService));

  app.use(
    '/docs*',
    expressBasicAuth({
      challenge: true,
      users: {
        admin: 'admin',
      },
      unauthorizedResponse: {
        message: 'unauthorized',
      },
    }),
  );

  patchNestjsSwagger();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  console.log(swaggerDocument);
  SwaggerModule.setup('docs', app, swaggerDocument);
  app.enableCors();

  await zodI18n(i18next, app);

  app.use(compression());
  app.use(helmet());
  app.use(I18nMiddleware);

  // Global Interceptors
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
