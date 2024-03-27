import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ZodDtoStatic } from '@anatine/zod-nestjs';
import { HTTP_ERRORS_BY_CODE } from '@anatine/zod-nestjs/src/lib/http-errors';
import { ValidationException } from '../exceptions';
import { ZodIssue } from 'zod';

export interface ZodValidationPipeOptions {
  errorHttpStatusCode?: keyof typeof HTTP_ERRORS_BY_CODE;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: object, metadata: ArgumentMetadata): unknown {
    const zodSchema = (metadata?.metatype as ZodDtoStatic)?.zodSchema;
    const isMultipartFormData = metadata?.type === 'body';

    if (!zodSchema) {
      return value;
    }

    const parseResult = zodSchema.safeParse(value);
    console.log(value);
    if (parseResult.success) {
      return parseResult.data;
    }

    const { error } = parseResult;
    const errorMessage = error.errors.map(
      (err) => `${err.path}: ${err.message}`,
    );

    if (isMultipartFormData) {
      const transformedValues = this.handleMultiPart(error.errors, value);
      const newValues = { ...value, ...transformedValues };

      const parsedNewValues = zodSchema.safeParse(newValues);

      if (parsedNewValues.success) {
        return parsedNewValues.data;
      }

      const newErrorMessage = parsedNewValues.error.errors.map(
        (err) => `${err.path}: ${err.message}`,
      );

      throw new ValidationException(newErrorMessage);
    }

    throw new ValidationException(errorMessage);
  }

  private handleMultiPart(errors: ZodIssue[], value: Record<string, any>) {
    return errors
      .map((error) => {
        if (
          error.code === 'invalid_type' &&
          (error.expected === 'array' || error.expected === 'object') &&
          error.received === 'string'
        ) {
          const erroredValue = value[error.path[0]];
          try {
            const parsed = JSON.parse(erroredValue);
            return { [error.path[0]]: parsed };
          } catch (parseError) {
            const message = errors.map(
              (error) => `${error.path}: ${error.message}`,
            );
            throw new ValidationException(message);
          }
        }

        return null;
      })
      .filter(Boolean)
      .reduce(
        (
          result: Record<string, any> | null,
          current: Record<string, any> | null,
        ) => {
          if (current && result) {
            const key = Object.keys(current)[0];
            result[key] = current[key];
          }
          return result;
        },
        {},
      );
  }
}
