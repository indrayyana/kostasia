import { handle } from 'hono/vercel';
import app from './app';

export const dynamic = 'force-dynamic';

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
