import { Injectable } from '@nestjs/common';
import { ExceptionsFileWriterService } from '../file-writer/exceptions-file-writer.service';
import { IException } from 'src/shared';

@Injectable()
export class ExceptionsLoggerService {
  constructor(
    private readonly exceptionsFileWRiterService: ExceptionsFileWriterService,
  ) {}

  logException(exception: IException) {
    return this.exceptionsFileWRiterService.writeToExceptionsLogFile(exception);
  }
}
