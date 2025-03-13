/* eslint-disable @typescript-eslint/no-explicit-any */

import { Context, Next } from 'hono';
import httpStatus from 'http-status';
import { ContentfulStatusCode, StatusCode } from 'hono/utils/http-status';
import ApiError from './ApiError';
import logger from './logger';

export const catchAsync =
  (fn: (c: Context, next: Next) => Promise<Response>) =>
  async (c: Context, next: Next) => {
    try {
      return await fn(c, next);
    } catch (error: any) {
      if (error instanceof ApiError) {
        logger.error('API error', {
          message: error.message,
        });

        const responseBody: {
          code: StatusCode;
          status: string;
          message: string;
          errors?: any;
        } = {
          code: error.statusCode,
          status: 'error',
          message: error.message,
        };

        if (error.statusCode === httpStatus.BAD_REQUEST && error.errors) {
          responseBody.errors = error.errors;
        }

        return c.json(
          responseBody,
          error.statusCode as unknown as ContentfulStatusCode
        );
      }

      logger.error('API error', {
        message: error.message,
      });

      return c.json(
        {
          code: httpStatus.INTERNAL_SERVER_ERROR,
          status: 'error',
          message: 'Internal Server Error',
        },
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  };

export default catchAsync;

