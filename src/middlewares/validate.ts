/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZodSchema } from 'zod';
import type { Context, ValidationTargets } from 'hono';
import httpStatus from 'http-status';
import { zValidator } from '@hono/zod-validator';
import ApiError from '@/utils/ApiError';

export const validate = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zValidator(target, schema, (result, c: Context) => {
    if (!result.success && 'error' in result) {
      const errors = result.error.errors.map(({ path, message }) => ({
        path,
        message,
      }));

      throw new ApiError(httpStatus.BAD_REQUEST, 'Bad Request', errors);
    }
  });

