import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export class ConfirmSignupDto extends createZodDto(
  z.object({ token: z.string() }).strict(),
) {}
