import { UserSchema } from 'src/generated';
import { createZodDto } from '@anatine/zod-nestjs';
import { UserService } from '../user.service';

export const userEntitySchema = UserSchema.pick(UserService.publicFields);

export class UserEntity extends createZodDto(userEntitySchema) {}
