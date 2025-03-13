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
import logger from '@/utils/logger';

export const dynamic = 'force-dynamic';

const app = new Hono().basePath('/api');

app.use(secureHeaders());
app.use(compress());

app.route('/auth', auth);
app.route('/users', user);
app.route('/rooms', room);
app.route('/notifications', notification);
app.route('/transactions', transaction);

app.notFound((c) => {
  return c.json(
    {
      code: httpStatus.NOT_FOUND,
      status: 'error',
      message: 'Route not found',
    },
    httpStatus.NOT_FOUND
  );
});

app.onError((err, c) => {
  logger.error(`API error: ${err}`);
  return c.json(
    {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      status: 'error',
      message: 'Internal Server Error',
    },
    httpStatus.INTERNAL_SERVER_ERROR
  );
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
