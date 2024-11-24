import { getToken } from 'next-auth/jwt';
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

const onlyAdmin = [
  '/dashboard/admin',
  '/dashboard/admin/kamar',
  '/dashboard/admin/user',

  '/api/rooms',
  '/api/users',
];
const authPage = ['/dashboard/login'];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token && !authPage.includes(pathname)) {
        const url = new URL('/dashboard/login', req.url);
        url.searchParams.set('callbackUrl', encodeURI(req.url));

        return NextResponse.redirect(url);
      }

      if (token) {
        // jika sudah login maka tidak bisa ke login page
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL('/dashboard/profil', req.url));
        }

        if (token.role !== 'admin' && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL('/', req.url));
        }
      }
    }

    return middleware(req, next);
  };
}

