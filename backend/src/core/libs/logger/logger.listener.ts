import { OnModuleInit } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { getSeparatedDate } from 'src/shared';

export class LoggerListener implements OnModuleInit {
  onModuleInit() {
    this.createLogFolderAndFilesIfNotExists();
  }

  createLogFolderAndFilesIfNotExists() {
    const { day, month, year } = getSeparatedDate();

    if (!existsSync(`./logs/${year}/${month}/${day}`)) {
      mkdirSync(`./logs/${year}/${month}/${day}`, { recursive: true });
    }

    if (!existsSync(`./logs/${year}/${month}/${day}/exceptions.json`)) {
      createWriteStream(`./logs/${year}/${month}/${day}/exceptions.json`, {
        flags: 'a',
      });
    }

    if (!existsSync(`./logs/${year}/${month}/${day}/app-requests.json`)) {
      createWriteStream(`./logs/${year}/${month}/${day}/app-requests.json`, {
        flags: 'a',
      });
    }
  }
}
