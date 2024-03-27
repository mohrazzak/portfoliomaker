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
import { IException, getSeparatedDate, requestMapper } from 'src/shared';
import { createId } from '@paralleldrive/cuid2';

@Catch(
  filter({
    for: PrismaClientKnownRequestError,
    when: (error) => error.code === 'P2025',
  }),
)
export class PrismaFindOrThrowFilter implements ExceptionFilter {
  constructor(
    private readonly exceptionsLoggerService: ExceptionsLoggerService,
  ) {}
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const { day, hour, minute, month, second, year } = getSeparatedDate();
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    try {
      const i18n = I18nContext.current<I18nTranslations>(host)!;
      const regex = /No (\w+) found/; // Regular expression to capture the entity
      const match = exception.message.match(regex);
      const entity = match ? match[1] : 'Entity';
      const errorMessage = i18n.t('validation.errors.findOrThrow', {
        args: {
          entity: entity,
        },
      });
      const exceptionBody: IException = {
        statusCode: HttpStatus.NOT_FOUND,
        message: errorMessage,
        request: requestMapper(req),
        time: formattedDate,
        id: createId(),
      };

      this.exceptionsLoggerService.logException(exceptionBody);

      res.status(HttpStatus.NOT_FOUND).json({
        status: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: errorMessage,
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
