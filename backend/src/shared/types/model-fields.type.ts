import { ZodType, z } from 'zod';

export type ModelFields<T extends ZodType<any, any, any>> =
  (keyof z.infer<T>)[];
