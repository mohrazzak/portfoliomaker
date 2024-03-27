import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { Role } from '@prisma/client';
import { SupportedLanguages } from 'src/shared';
import { z } from 'zod';

const usernameRegex =
  /^(?=.{2,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export const usernameSchema = z
  .string()
  .min(2)
  .max(24)
  .refine((username: string) => username.match(usernameRegex), {
    params: { i18n: 'invalidUsername' },
  });

extendZodWithOpenApi(z);

// const minLengthMaxLengthRegex = /^(.{8,16})$/;
const charExistRegex = /(?=.*[A-Za-z])/;
const numberExistRegex = /(?=.*\d)/;
// const specialCharExistRegex = /(?=.*[@#$%^&+=!*_])/;

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(16, { message: 'Password must not exceed 16 characters' })
  .regex(charExistRegex, {
    message: 'Password must contain at least one letter',
  })
  .regex(numberExistRegex, {
    message: 'Password must contain at least one number',
  })
  .default('[8-16][a-z][0-9]');

const phoneNumberRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const phoneNumberSchema = z
  .string()
  .regex(phoneNumberRegex)
  .nullable()
  .default('995587028');

export const emailSchema = z.string().email();

export const ShortcutSchema = z.nativeEnum(SupportedLanguages);
