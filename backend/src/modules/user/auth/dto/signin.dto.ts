import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from 'src/generated';
import * as z from 'zod';
import { ReturnedResponseSchema } from 'src/shared/interfaces/response.interface';
import { AppUserResponseSchema as AppUserResponseSchema } from '../../dto';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { userEntitySchema } from '../../entity';

extendZodWithOpenApi(z);

export class SigninDto extends createZodDto(
  UserSchema.pick({
    email: true,
    password: true,
  }).strict(),
) {}

const TokenSchema = z.object({
  data: z.object({
    token: z.string(),
    user: userEntitySchema,
  }),
});

const ReturnedUserSigninResponseSchema =
  ReturnedResponseSchema.merge(TokenSchema);

export class ReturnedUserSigninResponse extends createZodDto(
  ReturnedUserSigninResponseSchema,
) {}

export const AppUserSigninResponseSchema =
  AppUserResponseSchema.merge(TokenSchema);

export class AppUserSigninResponse extends createZodDto(
  AppUserSigninResponseSchema,
) {}
