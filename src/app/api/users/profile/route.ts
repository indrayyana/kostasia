import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { jwtVerify } from 'jose';
import { secretKey } from '@/services/token';
import userService from '@/services/user';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const token = req.cookies.get('access-token')?.value;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }

    const { payload } = await jwtVerify(token, secretKey);
    if (!payload) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }

    const user = await userService.getUserById(payload.sub as string);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
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

