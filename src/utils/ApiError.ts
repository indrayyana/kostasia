/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCode } from 'hono/utils/http-status';

export class ApiError extends Error {
  statusCode: StatusCode;
  isOperational: boolean;
  errors?: any;

  constructor(
    statusCode: StatusCode,
    message: string,
    errors?: any,
    isOperational: boolean = true,
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;

