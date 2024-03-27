import { SupportedLanguages } from '../enums';

export function getMultiLangFieldCreateObject(
  fallback: string,
  language: SupportedLanguages,
) {
  return {
    create: {
      fallback,
      language: { connect: { shortcut: language } },
    },
  };
}

export function getMultiLangFieldCreateOptionalObject(
  fallback: string | undefined | null,
  language: SupportedLanguages,
) {
  return fallback
    ? getMultiLangFieldCreateObject(fallback, language)
    : undefined;
}
