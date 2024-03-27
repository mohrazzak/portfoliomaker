import { UnprocessableEntityException } from '@nestjs/common';

export class ValidationException extends UnprocessableEntityException {
  constructor(message: any) {
    super(message[0]);
  }
}
