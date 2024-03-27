import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from 'src/generated';

export class userUpdateDto extends createZodDto(
  UserSchema.pick({
    fullName: true,
  }).strict(),
) {}
