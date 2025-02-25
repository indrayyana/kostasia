import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';

import notifValidation from '@/validations/notif';
import tokenService from '@/services/token';
import ApiError from '@/utils/ApiError';
import catchAsync from '@/utils/catchAsync';

export const dynamic = 'force-dynamic';

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

