import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from 'src/generated';
import { z } from 'zod';

const ConfirmResetUserPasswordByPasswordDtoSchema = z
  .object({
    resetToken: z.string(),
  })
  .strict();

export class ConfirmResetUserPasswordByPasswordDto extends createZodDto(
  ConfirmResetUserPasswordByPasswordDtoSchema.merge(
    UserSchema.pick({ password: true }),
  ).strict(),
) {}
