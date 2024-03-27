import { ApiBody } from '@nestjs/swagger';

export const ApiFile =
  (fieldNames: string[]): MethodDecorator =>
  (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const properties = fieldNames.reduce((acc: any, fieldName) => {
      acc[fieldName] = {
        type: 'string',
        format: 'binary',
      };
      return acc;
    }, {});

    ApiBody({
      schema: {
        type: 'object',
        properties,
      },
    })(target, propertyKey, descriptor);
  };
