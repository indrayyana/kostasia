/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { secretKey } from './app/api/auth/service';

export const config = {
  matcher: [
    '/api/users/:path*',
    '/api/admin/:path*',
    '/api/rooms/:path*',
    '/dashboard/:path*',
  ],
};

const noAuth = ['/api/rooms/denpasar', '/api/rooms/klungkung'];
const onlyAdmin = [
  '/dashboard/admin',
  '/dashboard/admin/kamar',
  '/dashboard/admin/user',
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (noAuth.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get('access-token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const { payload } = await jose.jwtVerify(token, secretKey);

    if (payload.type !== 'access') {
      return unauthorizedResponse(req);
    }

    if (onlyAdmin.includes(pathname) && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    if (err instanceof jose.errors.JWTExpired) {
      return unauthorizedResponse(req);
    }

    return NextResponse.redirect(new URL('/', req.url));
  }
}

function unauthorizedResponse(
  req: NextRequest,
  message: string = 'Please authenticate'
) {
  // For API routes, return a JSON response with 401 status
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json(
      {
        code: 401,
        status: 'error',
        message: message,
      },
      {
        status: 401,
      }
    );
  }

  // For page routes, redirect to login
  return NextResponse.redirect(new URL('/', req.url));
}

