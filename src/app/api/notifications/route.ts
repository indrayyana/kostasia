import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';

import notifService from '@/services/notif';
import notifValidation from '@/validations/notif';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(async (): Promise<NextResponse> => {
  const notifications = await notifService.getAllNotif();

  return NextResponse.json(
    {
      code: httpStatus.OK,
      status: 'success',
      message: 'Get notifications successfully',
      notifications,
    },
    { status: httpStatus.OK }
  );
});

export const POST = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();

    const validation = notifValidation.createNotif.safeParse({
      judul: body.judul,
      deskripsi: body.deskripsi,
      user_id: body.user_id,
    });
    if (!validation.success) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Bad Request',
        validation.error.flatten().fieldErrors
      );
    }

    const notification = await notifService.createNotif(body);

    return NextResponse.json(
      {
        code: httpStatus.CREATED,
        status: 'success',
        message: 'Create notification successfully',
        notification,
      },
      { status: httpStatus.CREATED }
    );
  }
);

