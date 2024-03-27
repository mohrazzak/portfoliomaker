import languageDetector from 'i18next-http-middleware';
import i18nextBackend from 'i18next-fs-backend';
import { join } from 'path';
import { i18n } from 'i18next';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction } from 'express';
import { makeZodI18nMap } from 'zod-i18n-map';
import { z } from 'zod';
import { IncomingMessage, Server, ServerResponse } from 'http';

/**
 * Set up Zod validations with internationalization (i18n) support.
 *
 * This function configures Zod error messages to be localized based on the request language.
 *
 * @param i18next - The i18next instance for localization.
 * @param app - The NestJS application to which the middleware will be applied.
 */
export const zodI18n = async (
  i18next: i18n,
  app: NestExpressApplication<
    Server<typeof IncomingMessage, typeof ServerResponse>
  >,
) => {
  app.use(languageDetector.handle(i18next));

  await i18next
    .use(i18nextBackend)
    .use(languageDetector.LanguageDetector)
    .init({
      preload: ['en', 'ar'],
      supportedLngs: ['en', 'ar'],
      fallbackLng: 'en',
      ns: ['zod', 'custom'],
      backend: {
        loadPath: join(
          process.cwd(),
          'src',
          'resources',
          'i18n',
          '{{lng}}',
          '{{ns}}.json',
        ),
      },
    });

  app.use(
    (
      req: Request & { language: string },
      res: Response,
      next: NextFunction,
    ) => {
      z.setErrorMap(
        makeZodI18nMap({
          t: i18next.getFixedT(req.language),
          ns: ['zod', 'custom'],
        }),
      );

      next();
    },
  );
  // z.setErrorMap(makeZodI18nMap(i18next));
};
