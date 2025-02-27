import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { setToken } from '@/utils/cookies';
import userService from '@/services/user';
import { RoleType } from '@/types/user';
import tokenService from '@/services/token';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const dynamic = 'force-dynamic';

export const POST = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const refreshToken = req.cookies.get('refresh-token')?.value;
    if (!refreshToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }

    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      'refresh'
    );
    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Token');
    }

    const user = await userService.getUserById(refreshTokenDoc.user_id);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Token');
    }

    const authTokens = await tokenService.generateAuthTokens({
      id: user.user_id,
      role: user.role as RoleType,
    });

    setToken(authTokens.access.token, authTokens.refresh.token);

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        tokens: authTokens,
      },
      { status: httpStatus.OK }
    );
  }
);

