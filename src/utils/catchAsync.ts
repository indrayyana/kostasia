import { Context, Next } from 'hono';

export const catchAsync = (fn: (c: Context, next: Next) => Promise<Response>) => async (c: Context, next: Next) => {
  try {
    return await fn(c, next);
  } catch (error) {
    throw error;
  }
};

export default catchAsync;

