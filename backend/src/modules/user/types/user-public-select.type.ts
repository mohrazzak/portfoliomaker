import { Prisma } from '@prisma/client';

export type UserPublicSelectType = { [key in keyof Prisma.UserSelect]?: true };
