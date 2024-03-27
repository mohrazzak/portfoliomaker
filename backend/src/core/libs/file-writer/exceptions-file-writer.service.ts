import { Injectable } from '@nestjs/common';
import { createWriteStream, statSync } from 'fs';
import { IException, getSeparatedDate } from 'src/shared';

@Injectable()
export class ExceptionsFileWriterService {
  private get exceptionsLogFilePath() {
    const { day, month, year } = getSeparatedDate();

    return `./logs/${year}/${month}/${day}/exceptions.json`;
  }

  writeToExceptionsLogFile(exception: IException) {
    try {
      const writeStream = createWriteStream(this.exceptionsLogFilePath, {
        flags: 'r+',
        start: statSync(this.exceptionsLogFilePath).size - 2,
      });

      writeStream.write(
        JSON.stringify([exception], null, 2).replace(/\[/, ','),
        (streamError) => {
          return streamError;
        },
      );
    } catch (error: any) {
      if (error instanceof RangeError) {
        const writeStream = createWriteStream(this.exceptionsLogFilePath, {
          flags: 'r+',
        });

        writeStream.write(
          JSON.stringify([exception], null, 2),
          (streamError) => {
            return streamError;
          },
        );
      }
    }
  }
}
