import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super('Invalid request parameteres');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({ message: err.msg, field: err.param }));
  }
}
