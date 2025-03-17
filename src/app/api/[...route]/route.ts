import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { secureHeaders } from 'hono/secure-headers';
import { handle } from 'hono/vercel';
import httpStatus from 'http-status';
import auth from './auth.route';
import user from './user.route';
import room from './room.route';
import notification from './notification.route';
import transaction from './transaction.route';
import { UserInterface } from '@/types/user';
import { errorConverter, errorHandler } from '@/middlewares/error';
import ApiError from '@/utils/ApiError';

export const dynamic = 'force-dynamic';

type Variables = {
  user: UserInterface;
};

const app = new Hono<{ Variables: Variables }>().basePath('/api');

app.use(secureHeaders());
app.use(compress());

app.route('/auth', auth);
app.route('/users', user);
app.route('/rooms', room);
app.route('/notifications', notification);
app.route('/transactions', transaction);

/* eslint-disable @typescript-eslint/no-unused-vars */
app.notFound((c) => {
  throw new ApiError(httpStatus.NOT_FOUND, 'Route not found');
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.onError(errorHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
