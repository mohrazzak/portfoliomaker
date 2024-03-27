import { registerAs } from '@nestjs/config';
import { NODE_ENV } from 'src/shared';

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT,
  environment: process.env.NODE_ENV || NODE_ENV.DEVELOPMENT,
  database: {
    host: process.env.DATABASE_HOST!,
    port: process.env.DATABASE_PORT!,
    user: process.env.DATABASE_USER!,
    name: process.env.DATABASE_NAME!,
    password: process.env.DATABASE_PASSWORD!,
  },
  client: {
    url: process.env.CLIENT_URL!,
    pages: {
      home: process.env.CLIENT_HOME_PAGE!,
      signup: process.env.CLIENT_SIGNUP_PAGE!,
      resetPassword: process.env.CLIENT_RESET_PASSWORD_PAGE!,
    },
  },
  server: {
    url: process.env.SERVER_URL!,
  },
  mail: {
    host: process.env.EM_HOST!,
    port: parseInt(process.env.EM_PORT || '465', 10),
    user: process.env.EM_USER!,
    password: process.env.EM_PASSWORD!,
    senderName: process.env.EM_SENDER_NAME!,
    senderEmail: process.env.EM_SENDER_EMAIL!,
  },
  jwt: {
    secret: process.env.JWT_LOGIN_SECRET!,
    confirmDuration: process.env.JWT_CONFIRM_DURATION!,
    loginDuration: process.env.JWT_LOGIN_DURATION!,
  },
  // redis: {
  //   host: process.env.REDIS_HOST!,
  //   port: process.env.REDIS_PORT!,
  //   password: process.env.REDIS_PASSWORD!,
  // },
}));
