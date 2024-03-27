import { RequestMethod as NestRequestMethod } from '@nestjs/common';

export type AppRequestMethod = keyof typeof NestRequestMethod;
