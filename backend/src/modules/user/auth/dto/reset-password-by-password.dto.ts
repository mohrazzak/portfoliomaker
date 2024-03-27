import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from 'src/generated';
import * as z from 'zod';

const ResetUserPasswordByPasswordDtoSchema = z
  .object({
    newPassword: z.string(),
  })
  .strict();

export class ResetUserPasswordByPasswordDto extends createZodDto(
  ResetUserPasswordByPasswordDtoSchema.merge(
    UserSchema.pick({ password: true }),
  ).strict(),
) {}
