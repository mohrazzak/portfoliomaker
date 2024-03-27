import { HttpStatus } from '@nestjs/common';
import { ILoggedRequest } from './logged-request.interface';

export interface IException {
  statusCode: HttpStatus;
  message: string;
  request: ILoggedRequest;
  time: string;
  id: string;
}
