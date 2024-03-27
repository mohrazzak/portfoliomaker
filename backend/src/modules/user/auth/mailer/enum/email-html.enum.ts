import { join } from 'path';

const htmlPath = join(
  process.cwd(),
  'src',
  'modules',
  'user',
  'auth',
  'mailer',
  'html',
);

const resetPasswordPath = join(htmlPath, 'reset-password.html');
const signupPath = join(htmlPath, 'signup-confirm.html');

export interface IEmailHtml {
  RESET_PASSWORD: string;
  SIGNUP: string;
}

export const emailHtml: IEmailHtml = {
  RESET_PASSWORD: resetPasswordPath,
  SIGNUP: signupPath,
};
