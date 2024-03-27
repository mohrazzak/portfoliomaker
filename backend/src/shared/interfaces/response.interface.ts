import { HttpStatus } from '@nestjs/common';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

extendZodWithOpenApi(z);

export interface IReturnedResponse<T = unknown> {
  statusCode: HttpStatus;
  message: string;
  data?: T;
}

export interface IResponseFromLoggingInterceptor {
  path: string;
  time?: string;
  duration?: number;
  status: boolean;
}

export type IResponse = IReturnedResponse & IResponseFromLoggingInterceptor;

export const ReturnedResponseSchema = z.strictObject({
  statusCode: z.number().openapi({ example: 200 }),
  message: z.string().openapi({ example: 'Request done successfully.' }),
  data: z.null().default(null).optional(),
});

const additionalResponseProperties = {
  status: z
    .boolean()
    .default(true)
    .describe('Indicates if the request done perfectly'),
  path: z.string().describe('URL Path').openapi({ example: '/auth/signup' }),
  time: z
    .string()
    .describe('Date in ISO string')
    .openapi({ example: new Date().toISOString() }),

  duration: z
    .number()
    .describe('Time taken in ms')
    .openapi({ example: new Date().toISOString() }),
};

export const AppResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject(additionalResponseProperties),
);

export class AppResponse extends createZodDto(AppResponseSchema) {}

export class ReturnedResponse extends createZodDto(ReturnedResponseSchema) {}
