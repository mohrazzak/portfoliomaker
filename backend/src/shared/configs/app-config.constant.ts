import { ClassProvider, Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  LoggingInterceptor,
  TimeoutInterceptor,
  ZodValidationPipe,
} from 'src/core';
import {
  HttpExceptionFilter,
  InternalExceptionFilter,
  PrismaDuplicateKeyConstraintFilter,
  PrismaFindOrThrowFilter,
  PrismaForeignKeyFailedFilter,
  ValidationExceptionFilter,
} from 'src/core/exception-filters';
import { ResponseMappingInterceptor } from 'src/core/interceptors/response-mapping.interceptor';

export const guards: Provider[] = [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
];

export const filters: ClassProvider[] = [
  { provide: APP_FILTER, useClass: InternalExceptionFilter },
  { provide: APP_FILTER, useClass: PrismaDuplicateKeyConstraintFilter },
  { provide: APP_FILTER, useClass: PrismaForeignKeyFailedFilter },
  { provide: APP_FILTER, useClass: PrismaFindOrThrowFilter },
  { provide: APP_FILTER, useClass: ValidationExceptionFilter },
  { provide: APP_FILTER, useClass: HttpExceptionFilter },
];

export const pipes: ClassProvider[] = [
  {
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  },
];

export const interceptors: ClassProvider[] = [
  { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  { provide: APP_INTERCEPTOR, useClass: ResponseMappingInterceptor },
  { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
];
