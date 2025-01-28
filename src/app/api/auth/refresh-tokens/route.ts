import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { setToken } from '@/utils/cookies';
import { getUserById } from '@/services/user';
import { RoleType } from '@/types/user';
import tokenService from '@/services/token';

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

    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      'refresh'
    );
    if (!refreshTokenDoc) {
      return NextResponse.json(
        {
          code: httpStatus.BAD_REQUEST,
          status: 'error',
          message: 'Invalid Token',
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const user = await getUserById(refreshTokenDoc.user_id);
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

