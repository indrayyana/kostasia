import { NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { authorizationUrl } from '@/lib/oauth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.redirect(authorizationUrl);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        code: httpStatus.INTERNAL_SERVER_ERROR,
        status: 'error',
        message: 'Internal Server Error',
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

