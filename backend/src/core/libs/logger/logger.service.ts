import {
  Injectable,
  LogLevel,
  LoggerService as NestJSLoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ILoggerColor,
  errorColor,
  getFormattedDate,
  logColor,
  warnColor,
} from 'src/shared';

@Injectable()
export class LoggerService implements NestJSLoggerService {
  constructor(private readonly configService: ConfigService) {}

  log(message: any, context: string): any {
    console.log(this.formatLogMessage(message, 'log', logColor, context));
  }

  error(message: any, context: string): any {
    console.log(this.formatLogMessage(message, 'error', errorColor, context));
  }

  warn(message: any, context: string): any {
    console.log(this.formatLogMessage(message, 'warn', warnColor, context));
  }

  formatLogMessage(
    message: string,
    logLevel: LogLevel,
    logColor: ILoggerColor,
    context: string,
  ) {
    const { contextColor, messageColor } = logColor;

    const formattedLogMessage = `${messageColor}[${this.configService.get<string>(
      'APP_NAME',
    )}] ${messageColor}${
      process.pid
    } - ${getFormattedDate()} ${logLevel.toUpperCase()} ${contextColor}[${context}] ${messageColor}${message}`;

    return formattedLogMessage;
  }
}
