import { Request } from 'express';
import { IDynamicObject, ILoggedRequest } from '../interfaces';
import { RequestMethod } from '@nestjs/common';

export const requestMapper = (request: Request) => {
  const { params, path, query, headers, body, method } = request;

  const mappedRequest: ILoggedRequest = {
    path,
    queryParams: query,
    body,
    token: (headers.authorization || 'Bearer ').split(' ')[1],
    lang: headers['accept-language'] ?? 'en',
    routeParams: params,
    method: (RequestMethod as IDynamicObject)[method],
  };

  return mappedRequest;
};
