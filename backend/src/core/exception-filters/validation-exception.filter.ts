import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const i18n = I18nContext.current<I18nTranslations>(host)!;
    const request = ctx.getRequest();
    const statusCode =
      exception?.getStatus() || HttpStatus.UNPROCESSABLE_ENTITY;
    const message = i18n.t('app.errors.validation');

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      statusCode,
      message,
      path: request.path,
      time: new Date().toISOString(),
      data: null,
    });
  }
}
