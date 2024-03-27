import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators'; // Import map from rxjs/operators
import { Observable } from 'rxjs';
import { IAuthRequest, requestMapper } from 'src/shared';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { RequestsLoggerService } from '../libs/logger/requests-logger.service';

@Injectable()
export class LoggingInterceptor
  implements NestInterceptor<IResponse, IResponse>
{
  constructor(private readonly requestsLoggerService: RequestsLoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<IResponse>,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<IAuthRequest>();
    const now = Date.now();
    return next.handle().pipe(
      map((response: IResponse) => {
        if (!response) return;
        response.time = new Date().toISOString();
        response.duration = Date.now() - now;
        this.requestsLoggerService.logRequest(requestMapper(request), response);
        return response;
      }),
    );
  }
}
