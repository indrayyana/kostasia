import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';

import notifValidation from '@/validations/notif';
import tokenService from '@/services/token';
import ApiError from '@/utils/ApiError';
import catchAsync from '@/utils/catchAsync';
import userService from '@/services/user';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(async (): Promise<NextResponse> => {
  const users = await userService.getUserWithPermission();

  return NextResponse.json(
    {
      code: httpStatus.OK,
      status: 'success',
      message: 'Get users with notification permission successfully',
      users,
    },
    { status: httpStatus.OK }
  );
});

export const POST = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const { token, user_id } = await req.json();

    const validation = notifValidation.saveNotifToken.safeParse({
      token,
      user_id,
    });
    if (!validation.success) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Bad Request',
        validation.error.flatten().fieldErrors
      );
    }

    await tokenService.saveToken(token, user_id, null, 'notification');

    return NextResponse.json(
      {
        code: httpStatus.CREATED,
        status: 'success',
        message: 'Save FCM token successfully',
      },
      { status: httpStatus.CREATED }
    );
  }
);

