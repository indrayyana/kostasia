/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Context, Next } from 'hono';
import httpStatus from 'http-status';
import { ContentfulStatusCode, StatusCode } from 'hono/utils/http-status';
import { PostgrestError } from '@supabase/supabase-js';
import ApiError from '@/utils/ApiError';
import logger from '@/utils/logger';

export const errorConverter = async (c: Context, next: Next) => {
  return next().catch((err: any) => {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode =
        error.statusCode || error instanceof PostgrestError
          ? httpStatus.BAD_REQUEST
          : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      error = new ApiError(statusCode, message, false, err.stack);
    }
    throw error;
  });
};

export const errorHandler = async (err: any, c: Context) => {
  let { statusCode, message } = err;

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  logger.error('API error', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  return c.json(
    {
      code: statusCode as StatusCode,
      status: 'error',
      message,
      ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
    },
    statusCode as unknown as ContentfulStatusCode
  );
};

