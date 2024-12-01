import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh-token')?.value;
    if (!refreshToken) {
      return NextResponse.json(
        {
          code: httpStatus.UNAUTHORIZED,
          status: 'error',
          message: 'Please authenticate',
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    const tokenDoc = await prisma.token.findFirst({
      where: {
        token: refreshToken,
        type: 'refresh',
      },
    });

    if (!tokenDoc) {
      return NextResponse.json(
        {
          code: httpStatus.NOT_FOUND,
          status: 'error',
          message: 'Token not found',
        },
        { status: httpStatus.NOT_FOUND }
      );
    }

    await prisma.token.deleteMany({
      where: {
        token: refreshToken,
      },
    });

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        message: 'Logout successfully',
      },
      { status: httpStatus.OK }
    );
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

