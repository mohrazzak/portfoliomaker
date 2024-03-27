import { buildTemplatedApiExceptionDecorator } from '@nanogiants/nestjs-swagger-api-exception-decorator';

export const ApiException = buildTemplatedApiExceptionDecorator({
  statusCode: '$status',
  time: '2023-11-04T10:57:32.110Z',
  path: 'string',
  message: { field: 'string', message: 'string' },
  data: null,
});
