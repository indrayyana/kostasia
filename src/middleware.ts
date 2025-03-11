/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { errors, jwtVerify } from "jose";
import { secretKey } from "@/services/token";

export const config = {
  matcher: [
    "/api/users/:path*",
    "/api/admin/:path*",
    "/api/rooms/:path*",
    "/api/notifications/:path*",
    "/dashboard/:path*",
    "/booking/:path*",
  ],
};

const noAuth = ["/api/rooms/denpasar", "/api/rooms/klungkung"];
const onlyAdmin = [
  "/dashboard/admin",
  "/dashboard/admin/kamar",
  "/dashboard/admin/user",
  "/dashboard/admin/pembayaran",
  "/dashboard/admin/notifikasi",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (noAuth.includes(pathname) || noAuth.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access-token")?.value;
  if (!token) {
    const url = new URL("/", req.url);
    url.searchParams.set("callbackUrl", encodeURI(req.url));

    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (payload.type !== "access") {
      return unauthorizedResponse(req);
    }

    if (onlyAdmin.includes(pathname) && payload.role !== "admin") {
      const url = new URL("/", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      return unauthorizedResponse(req);
    } else if (err instanceof errors.JWSSignatureVerificationFailed) {
      return unauthorizedResponse(req);
    }

    const url = new URL("/", req.url);
    url.searchParams.set("callbackUrl", encodeURI(req.url));

    return NextResponse.redirect(url);
  }
}

function unauthorizedResponse(req: NextRequest, message: string = "Please authenticate") {
  // For API routes, return a JSON response with 401 status
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      {
        code: 401,
        status: "error",
        message: message,
      },
      {
        status: 401,
      }
    );
  }

  // For page routes, redirect to login
  const url = new URL("/", req.url);
  url.searchParams.set("callbackUrl", encodeURI(req.url));

  return NextResponse.redirect(url);
}
