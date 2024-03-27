import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { I18nTranslations } from 'src/generated';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(100000),
      catchError((err) => {
        const i18n = I18nContext.current<I18nTranslations>(context)!;

        if (err instanceof TimeoutError) {
          return throwError(
            () => new RequestTimeoutException(i18n.t('app.errors.timeout')),
          );
        }

        return throwError(() => err);
      }),
    );
  }
}
