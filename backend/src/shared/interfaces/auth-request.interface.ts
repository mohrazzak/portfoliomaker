import { Request } from 'express';
import { IDecodedToken } from './token.interface';

export interface IAuthRequest extends Request {
  user: IDecodedToken;
}
