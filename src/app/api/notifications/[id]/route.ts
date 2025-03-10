import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { ContextParams } from '@/types/context';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';
import notificationService from '@/services/notification';
import notifValidation from '@/validations/notif';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
  async (req: NextRequest, ctx: ContextParams): Promise<NextResponse> => {
    const userId = ctx.params.id;

    const validation = notifValidation.getNotif.safeParse({ user_id: userId });
    if (!validation.success) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Invalid ID',
        validation.error.flatten().fieldErrors
      );
    }

    const notifications = await notificationService.getAllNotifByUserId(userId);

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        message: 'Get notification successfully',
        notifications,
      },
      { status: httpStatus.OK }
    );
  }
);

export const DELETE = catchAsync(
  async (req: NextRequest, ctx: ContextParams): Promise<NextResponse> => {
    const id = parseInt(ctx.params.id, 10);

    const validation = notifValidation.deleteNotif.safeParse({
      notifikasi_id: id,
    });
    if (!validation.success) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Invalid ID',
        validation.error.flatten().fieldErrors
      );
    }

    await notificationService.deleteNotifById(id);

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        message: 'Delete notification successfully',
      },
      { status: httpStatus.OK }
    );
  }
);

