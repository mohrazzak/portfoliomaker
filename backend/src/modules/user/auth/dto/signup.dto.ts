import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from 'src/generated';
import { passwordSchema } from 'src/generated/zod/schemas';
import * as z from 'zod';

export class SignupDto extends createZodDto(
  UserSchema.pick({ email: true })
    .merge(
      z.object({
        password: passwordSchema,
      }),
    )
    .strict(),
) {}

// TODO change the returned statusCode to 201 in the swagger
