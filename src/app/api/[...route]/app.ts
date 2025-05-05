import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { secureHeaders } from 'hono/secure-headers';
import { timeout } from 'hono/timeout';
import httpStatus from 'http-status';
import { authLimiter } from '@/middlewares/rateLimiter';
import auth from './auth_route';
import user from './user_route';
import room from './room_route';
import notification from './notification_route';
import transaction from './transaction_route';
import { UserInterface } from '@/types/user';
import { errorHandler } from '@/middlewares/error';
import ApiError from '@/utils/ApiError';

type Variables = {
  user: UserInterface;
};

const app = new Hono<{ Variables: Variables }>().basePath('/api');

app.use(secureHeaders());
app.use(compress());

// Applying a 10-second timeout
app.use('/', timeout(10000));

// limit repeated failed requests to auth endpoints
app.use('/auth/*', authLimiter);

// API routes
app.route('/auth', auth);
app.route('/users', user);
app.route('/rooms', room);
app.route('/notifications', notification);
app.route('/transactions', transaction);

/* eslint-disable @typescript-eslint/no-unused-vars */
app.notFound((c) => {
  throw new ApiError(httpStatus.NOT_FOUND, 'Route not found');
});

// handle error
app.onError(errorHandler);

export default app;

