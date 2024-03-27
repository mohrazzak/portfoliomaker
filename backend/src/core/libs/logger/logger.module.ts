import { Module } from '@nestjs/common';
import { ExceptionsLoggerService } from './exceptions-logger.service';
import { LoggerListener } from './logger.listener';
import { FileWriterModule } from '../file-writer/file-writer.module';
import { LoggerService } from './logger.service';
import { RequestsLoggerService } from './requests-logger.service';

@Module({
  imports: [FileWriterModule],
  providers: [ExceptionsLoggerService, LoggerService, RequestsLoggerService],
  exports: [ExceptionsLoggerService, LoggerService, RequestsLoggerService],
})
export class LoggerModule extends LoggerListener {}
