import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { google, oauth2Client } from '@/lib/oauth';
import { config } from '@/utils/config';
import { setToken } from '@/utils/cookies';
import { RoleType } from '@/types/user';
import tokenService from '@/services/token';
import catchAsync from '@/utils/catchAsync';
import userService from '@/services/user';
import ApiError from '@/utils/ApiError';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Authorization code is missing'
      );
    }

    const { tokens: googleTokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(googleTokens);

    const { data } = await google
      .oauth2({ auth: oauth2Client, version: 'v2' })
      .userinfo.get();

    if (!data.email || !data.name) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Login failed');
    }

    // save user when first login
    let user = await userService.getUserByEmail(data.email);
    let userId;

    if (user) {
      userId = user.user_id;

      user = await userService.updateGoogleUserById(userId, data);
    } else {
      user = await userService.createGoogleUser(data);

      userId = user.user_id;
    }

    const authTokens = await tokenService.generateAuthTokens({
      id: userId,
      role: user.role as RoleType,
    });

    setToken(authTokens.access.token, authTokens.refresh.token);

    return NextResponse.redirect(config.app.dashboardURL);
  }
);

