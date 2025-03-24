/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Context } from 'hono';
import httpStatus from 'http-status';
import { ContentfulStatusCode, StatusCode } from 'hono/utils/http-status';
import { PostgrestError } from '@supabase/supabase-js';
import { Prisma } from '@prisma/client';
import ApiError from '@/utils/ApiError';
import logger from '@/utils/logger';

export const errorConverter = async (err: any) => {
  if (err instanceof ApiError) {
    return err;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaClientError(err);
  }

  const statusCode =
    err.statusCode || (err instanceof PostgrestError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR);

  const message = err.message || httpStatus[statusCode];

  return new ApiError(statusCode, message, [], false, err.stack);
};

export const errorHandler = async (err: any, c: Context) => {
  try {
    err = await errorConverter(err);
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
        errors: err.errors ?? [],
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
      },
      statusCode as unknown as ContentfulStatusCode
    );
  } catch (err: any) {
    logger.error('Unexpected error in errorHandler', {
      message: err.message,
      stack: err.stack,
    });

    return c.json(
      {
        code: httpStatus.INTERNAL_SERVER_ERROR,
        status: 'error',
        message: 'Internal Server Error',
      },
      httpStatus.INTERNAL_SERVER_ERROR as unknown as ContentfulStatusCode
    );
  }
};

const handlePrismaClientError = (err: any) => {
  switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      return new ApiError(
        httpStatus.BAD_REQUEST,
        `Duplicate field value: ${err.meta.target} (${err.meta.target} is already in use)`,
        [],
        false,
        err.stack
      );
    case 'P2014':
      // handling invalid id errors
      return new ApiError(httpStatus.BAD_REQUEST, `Invalid ID: ${err.meta.target}`, [], false, err.stack);
    case 'P2003':
      // handling invalid data errors
      return new ApiError(httpStatus.BAD_REQUEST, `Invalid input data: ${err.meta.target}`, [], false, err.stack);
    default:
      // handling all other errors
      return new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong: ${err.message}`,
        [],
        false,
        err.stack
      );
  }
};

