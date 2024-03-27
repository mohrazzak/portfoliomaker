import { UserSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';

export class UserModel extends createZodDto(UserSchema) {}
