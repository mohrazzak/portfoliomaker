import { Injectable } from '@nestjs/common';
import { createWriteStream, statSync } from 'fs';
import { getSeparatedDate } from 'src/shared';
import { IRequestsFileEntry } from 'src/shared/interfaces/requests-file-entry.interface';

@Injectable()
export class RequestsFileWriterService {
  private get requestsLogFilePath() {
    const { day, month, year } = getSeparatedDate();

    return `./logs/${year}/${month}/${day}/app-requests.json`;
  }

  writeToRequestsLogFile(requestsFileEntry: IRequestsFileEntry) {
    try {
      const writeStream = createWriteStream(this.requestsLogFilePath, {
        flags: 'r+',
        start: statSync(this.requestsLogFilePath).size - 2,
      });

      writeStream.write(
        JSON.stringify([requestsFileEntry], null, 2).replace(/\[/, ','),
        (streamError) => {
          return streamError;
        },
      );
    } catch (error: any) {
      if (error instanceof RangeError) {
        const writeStream = createWriteStream(this.requestsLogFilePath, {
          flags: 'r+',
        });

        writeStream.write(
          JSON.stringify([requestsFileEntry], null, 2),
          (streamError) => {
            return streamError;
          },
        );
      }
    }
  }
}
