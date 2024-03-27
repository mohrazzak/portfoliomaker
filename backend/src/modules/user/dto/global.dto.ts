import { createZodDto } from '@anatine/zod-nestjs';

import { userEntitySchema } from '../entity';
import {
  AppResponseSchema,
  ReturnedResponseSchema,
} from 'src/shared/interfaces/response.interface';
import { z } from 'zod';

const userData = z.object({ user: userEntitySchema });

export const ReturnedUserResponseSchema = ReturnedResponseSchema.merge(
  z.strictObject({ data: userData }),
);

export const AppUserResponseSchema = AppResponseSchema.merge(
  z.object({ data: userData }),
);

export class ReturnedUserResponse extends createZodDto(
  ReturnedUserResponseSchema,
) {}
export class AppUserResponse extends createZodDto(AppUserResponseSchema) {}
