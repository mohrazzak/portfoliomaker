import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const i18n = I18nContext.current<I18nTranslations>(host)!;
    const request = ctx.getRequest();

    const statusCode = exception?.getStatus() || 400;
    const message =
      exception.message || i18n.t('app.errors.internalServerError');

    response.status(statusCode).json({
      status: false,
      statusCode,
      message,
      path: request.path,
      time: new Date().toISOString(),
      data: null,
    });
  }
}
