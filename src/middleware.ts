import { NextRequest, NextResponse } from 'next/server';
import withAuth from './middlewares/withAuth';

/* eslint-disable @typescript-eslint/no-unused-vars */
export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();

  return res;
}

export default withAuth(mainMiddleware, [
  '/dashboard',
  '/dashboard/admin',
  '/dashboard/admin/kamar',
  '/dashboard/admin/user',
  '/dashboard/profil',
  '/dashboard/login',

  '/api/rooms',
  '/api/users',
]);

