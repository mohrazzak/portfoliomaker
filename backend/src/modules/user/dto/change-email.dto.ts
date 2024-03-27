import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from 'src/generated';

export class userChangeEmailDto extends createZodDto(
  UserSchema.pick({
    email: true,
  }).strict(),
) {}
