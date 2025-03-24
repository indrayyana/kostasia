/* eslint-disable @typescript-eslint/no-explicit-any */

import { Context } from 'hono';
import { getConnInfo } from 'hono/vercel';
import { rateLimiter } from 'hono-rate-limiter';
import httpStatus from 'http-status';
import ApiError from '@/utils/ApiError';

export const authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  skipSuccessfulRequests: true,
  keyGenerator: (c: Context) => {
    const info = getConnInfo(c);
    const ipAddress =
      info?.remote?.address ||
      c.req.header('x-forwarded-for') ||
      c.req.header('x-real-ip') ||
      (c.req.raw as any).socket?.remoteAddress;

    return ipAddress;
  },
  handler: () => {
    throw new ApiError(
      httpStatus.TOO_MANY_REQUESTS,
      'Too many requests, please try again later'
    );
  },
});

