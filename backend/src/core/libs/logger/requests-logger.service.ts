import { Injectable } from '@nestjs/common';
import { RequestsFileWriterService } from '../file-writer/requests-file-writer.service';
import { ILoggedRequest } from 'src/shared';
import { IResponse } from 'src/shared/interfaces/response.interface';

@Injectable()
export class RequestsLoggerService {
  constructor(
    private readonly requestsFileWriterService: RequestsFileWriterService,
  ) {}

  logRequest(request: ILoggedRequest, response: IResponse) {
    return this.requestsFileWriterService.writeToRequestsLogFile({
      request,
      response,
    });
  }
}
