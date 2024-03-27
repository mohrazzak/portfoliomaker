import { RequestMethod } from '@nestjs/common';
import { IDynamicObject } from './dynamic-object.interface';

export interface ILoggedRequest {
  path: string;
  body: IDynamicObject;
  queryParams: IDynamicObject;
  routeParams: IDynamicObject;
  token?: string;
  lang: string;
  method: RequestMethod;
}
