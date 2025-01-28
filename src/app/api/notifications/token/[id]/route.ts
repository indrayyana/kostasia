import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';

import { ContextParams } from '@/types/context';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';
import userValidation from '@/validations/user';
import tokenService from '@/services/token';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
  async (req: NextRequest, ctx: ContextParams): Promise<NextResponse> => {
    const userId = ctx.params.id;

    const validation = userValidation.getUser.safeParse({ user_id: userId });
    if (!validation.success) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Invalid user ID',
        validation.error.flatten().fieldErrors
      );
    }

    const token = await tokenService.getNotificationToken(userId);

    return NextResponse.json({
      code: 200,
      status: 'success',
      message: 'Get FCM token successfully',
      token: token.token,
    });
  }
);

