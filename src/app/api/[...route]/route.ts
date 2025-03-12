import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import auth from './auth.route';
import room from './room.route';
import transaction from './transaction.route';

export const dynamic = 'force-dynamic';

const app = new Hono().basePath('/api');

app.route('/auth', auth);
app.route('/rooms', room);
app.route('/transactions', transaction);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

