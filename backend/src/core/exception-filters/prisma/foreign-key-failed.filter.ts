import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { filter } from 'nestjs-conditional-exception-filter';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import { ExceptionsLoggerService } from '../../libs/logger/exceptions-logger.service';
import { IException, requestMapper } from 'src/shared';
import { createId } from '@paralleldrive/cuid2';

@Catch(
  filter({
    for: PrismaClientKnownRequestError,
    when: (error) => error.code === 'P2003',
  }),
)
export class PrismaForeignKeyFailedFilter implements ExceptionFilter {
  constructor(
    private readonly exceptionsLoggerService: ExceptionsLoggerService,
  ) {}
  catch(
    exception: PrismaClientKnownRequestError & { meta: { field_name: string } },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    try {
      const i18n = I18nContext.current<I18nTranslations>(host)!;
      const keys = exception.meta.field_name.split('Id');
      console.log(exception);
      const entity = keys[0];
      const uppercasedEntity = entity.charAt(0).toUpperCase() + entity.slice(1);
      const errorMessages: string[] = [];
      errorMessages.push(
        i18n.translate('validation.errors.foreignKeyFailed', {
          args: {
            entity: uppercasedEntity,
          },
        }),
      );

      const exceptionBody: IException = {
        statusCode: HttpStatus.CONFLICT,
        message: errorMessages.join(', '),
        request: requestMapper(req),
        time: new Date().toISOString(),
        id: createId(),
      };

      this.exceptionsLoggerService.logException(exceptionBody);

      res.status(HttpStatus.CONFLICT).json({
        status: false,
        statusCode: HttpStatus.CONFLICT,
        message: errorMessages.join(', '),
        path: req.path,
        time: new Date().toISOString(),
        data: null,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error, fire your backend developer',
        path: req.path,
        time: new Date().toISOString(),
        data: null,
      });
    }
  }
}
