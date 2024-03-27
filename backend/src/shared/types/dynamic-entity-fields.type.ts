import { ZodObject } from 'zod';

export type DynamicEntityFields<T extends ZodObject<any, any, any>> = {
  [key in keyof T['_input']]: true;
};
