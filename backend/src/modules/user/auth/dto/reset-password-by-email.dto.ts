import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from 'src/generated';

export class ResetPasswordByEmailDto extends createZodDto(
  UserSchema.pick({ email: true }).strict(),
) {}
