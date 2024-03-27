// ? more info on these colors
// ? https://tforgione.fr/posts/ansi-escape-codes/

import { ILoggerColor } from '../interfaces';

export const logColor: ILoggerColor = {
  // message: cyan bright, context: magnet bright (my favorite)
  messageColor: '\x1B[96m',
  contextColor: `\x1B[95m`,
};

export const errorColor: ILoggerColor = {
  // message: red, context: idk what the second color is called
  messageColor: '\x1B[31m',
  contextColor: `\x1b[1;30m`,
};

export const warnColor: ILoggerColor = {
  // message: RED, context: white
  messageColor: '\x1b[1;31m',
  contextColor: `\x1b[1;37m`,
};

export const dateColor = '\x1B[39m';
