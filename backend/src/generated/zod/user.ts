import * as z from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { $Enums } from '@prisma/client';
import * as imports from './schemas';
import { Role } from './enums';

const zodOpenApi = extendZodWithOpenApi(z);

export const UserSchema = z.object({
  id: z.string().uuid(),
  fullName: z
    .string()
    .min(3)
    .max(20)
    .nullable()
    .default('Full Name')
    .nullable(),
  role: z.nativeEnum($Enums.Role),
  password: z.any().and(imports.passwordSchema),
  email: z.custom().and(imports.emailSchema),
  isActive: z.boolean().default(false),
  isBanned: z.boolean().default(false),
  lastLogin: z.date().nullable().default(new Date()).nullable(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  deletedAt: z.date().nullable().default(new Date()), // TODO implement the soft delete.nullable(),
});
