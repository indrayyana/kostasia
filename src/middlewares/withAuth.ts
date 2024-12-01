// import {
//   NextFetchEvent,
//   NextMiddleware,
//   NextRequest,
//   NextResponse,
// } from 'next/server';
// import { config } from '../utils/config';
// import { getUserById } from '../app/api/users/[id]/route';

// const onlyAdmin = [
//   '/dashboard/admin',
//   '/dashboard/admin/kamar',
//   '/dashboard/admin/user',
// ];
// const authPage = ['/dashboard/login'];

// export default function withAuth(
//   middleware: NextMiddleware,
//   requireAuth: string[] = []
// ) {
//   return async (req: NextRequest, next: NextFetchEvent) => {
//     const pathname = req.nextUrl.pathname;

//     if (requireAuth.includes(pathname)) {
//       const token = req.cookies.get('access-token')?.value;

//       if (!token && !authPage.includes(pathname)) {
//         const url = new URL('/dashboard/login', req.url);
//         url.searchParams.set('callbackUrl', encodeURI(req.url));

//         return NextResponse.redirect(url);
//       }

//       if (token) {
//         // jika sudah login maka tidak bisa ke login page
//         if (authPage.includes(pathname)) {
//           return NextResponse.redirect(new URL('/dashboard/profil', req.url));
//         }

//         const decoded = await jwt.verify(token, config.jwt.secret);
//         const user = await getUserById(decoded.sub as string);

//         if (user?.role !== 'admin' && onlyAdmin.includes(pathname)) {
//           return NextResponse.redirect(new URL('/', req.url));
//         }
//       }
//     }

//     return middleware(req, next);
//   };
// }

