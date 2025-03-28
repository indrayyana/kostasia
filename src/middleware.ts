import { NextRequest, NextResponse } from 'next/server';
import { errors, jwtVerify } from 'jose';
import { secretKey } from '@/services/token';

export const config = {
  matcher: ['/dashboard/:path*', '/booking/:path*'],
};

const onlyAdmin = [
  '/dashboard/admin',
  '/dashboard/admin/kamar',
  '/dashboard/admin/user',
  '/dashboard/admin/pembayaran',
  '/dashboard/admin/notifikasi',
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get('access-token')?.value;
  if (!token) {
    const url = new URL('/', req.url);
    url.searchParams.set('is_login', 'false');

    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (payload.type !== 'access') {
      return NextResponse.next();
    }

    if (onlyAdmin.includes(pathname) && payload.role !== 'admin') {
      const url = new URL('/', req.url);
      url.searchParams.set('callbackUrl', encodeURI(req.url));

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      return NextResponse.next();
    } else if (err instanceof errors.JWSSignatureVerificationFailed) {
      return NextResponse.next();
    }

    return NextResponse.next();
  }
}
