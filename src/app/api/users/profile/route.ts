import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { jwtVerify } from 'jose';
import { secretKey } from '@/services/token';
import { getUserById } from '@/services/user';
import catchAsync from '@/utils/catchAsync';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const token = req.cookies.get('access-token')?.value;
    if (!token) {
      return NextResponse.json(
        {
          code: httpStatus.UNAUTHORIZED,
          status: 'error',
          message: 'Please authenticate',
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    const { payload } = await jwtVerify(token, secretKey);
    if (!payload) {
      throw new Error('Invalid token');
    }

    const user = await getUserById(payload.sub as string);
    if (!user) {
      return NextResponse.json(
        {
          code: httpStatus.UNAUTHORIZED,
          status: 'error',
          message: 'Invalid Token',
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        message: 'Get user successfully',
        user,
      },
      { status: httpStatus.OK }
    );
  }
);

