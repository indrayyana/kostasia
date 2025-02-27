import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';
import tokenService from '@/services/token';

export const dynamic = 'force-dynamic';

export const POST = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const refreshToken = req.cookies.get('refresh-token')?.value;
    if (!refreshToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }

    const tokenDoc = await tokenService.getTokenByType(refreshToken, 'refresh');
    if (!tokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
    }

    await tokenService.deleteToken(refreshToken);

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        message: 'Logout successfully',
      },
      { status: httpStatus.OK }
    );
  }
);

