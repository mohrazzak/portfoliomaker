import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { SupportedLanguages } from 'src/shared';

export function I18nHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'Accept-Language',
      enum: SupportedLanguages,
      required: false,
      example: 'ar',
      description:
        "Specify the preferred language for the response, If not provided, the server will use the default 'en' language.",
      allowEmptyValue: true,
    }),
  );
}
