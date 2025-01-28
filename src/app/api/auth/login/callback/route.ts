import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';

import { google, oauth2Client } from '@/lib/oauth';
import prisma from '@/lib/prisma';
import { config } from '@/utils/config';
import { setToken } from '@/utils/cookies';
import { RoleType } from '@/types/user';
import tokenService from '@/services/token';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        {
          code: httpStatus.BAD_REQUEST,
          status: 'error',
          message: 'Authorization code is missing',
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const { tokens: googleTokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(googleTokens);

    const { data } = await google
      .oauth2({ auth: oauth2Client, version: 'v2' })
      .userinfo.get();

    if (!data.email || !data.name) {
      return NextResponse.json(
        {
          code: httpStatus.BAD_REQUEST,
          status: 'error',
          message: 'Login failed',
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    // save user when first login
    let user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    let userId;

    if (user) {
      userId = user.user_id;

      user = await prisma.user.update({
        where: {
          user_id: userId,
        },
        data: {
          nama: data.name,
          email: data.email,
          foto: data.picture || null,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          nama: data.name,
          email: data.email,
          foto: data.picture || null,
        },
      });

      userId = user.user_id;
    }

    const authTokens = await tokenService.generateAuthTokens({
      id: userId,
      role: user.role as RoleType,
    });

    setToken(authTokens.access.token, authTokens.refresh.token);

    return NextResponse.redirect(config.app.dashboardURL);
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

