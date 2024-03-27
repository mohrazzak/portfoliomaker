import * as Joi from 'joi';
import { NODE_ENV } from '../enums';

export const configValidation = Joi.object({
  environment: Joi.string().valid(...Object.values(NODE_ENV)),
  database: Joi.object({
    url: Joi.string().uri(),
    local: Joi.string(),
  }),
  client: Joi.object({
    localUrl: Joi.string(),
    productionUrl: Joi.string(),
  }),
  server: Joi.object({
    runningUrl: Joi.string(),
    localUrl: Joi.string(),
    productionUrl: Joi.string(),
  }),
  mail: Joi.object({
    host: Joi.string(),
    port: Joi.number().integer(),
    user: Joi.string(),
    password: Joi.string(),
    senderName: Joi.string(),
    senderEmail: Joi.string().email(),
  }),
  jwt: Joi.object({
    login: Joi.object({
      secret: Joi.string(),
      duration: Joi.string(),
    }),
    resetPassword: Joi.object({
      secret: Joi.string(),
      duration: Joi.string(),
    }),
  }),
  azure: Joi.object({
    account: Joi.string().required(),
    key: Joi.string().required(),
  }),
  redis: Joi.object({
    host: Joi.string().required(),
    port: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
