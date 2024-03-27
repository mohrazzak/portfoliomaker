import { ILoggedRequest } from './logged-request.interface';
import { IResponse } from './response.interface';

export interface IRequestsFileEntry {
  request: ILoggedRequest;
  response: IResponse;
}
