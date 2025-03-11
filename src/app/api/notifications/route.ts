import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import notificationService from '@/services/notification';
import notifValidation from '@/validations/notif';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(async (): Promise<NextResponse> => {
  const notifications = await notificationService.getAllNotification();

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

    const notification = await notificationService.createNotification(body);

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

export const DELETE = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const idParam = req.nextUrl.searchParams.get('id');
    if (!idParam) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'ID parameter is required');
    }

    const ids = idParam.split(',').map(Number).filter(Boolean);
    if (ids.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID format');
    }

    await notificationService.deleteAllNotificationById(ids);

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        message: 'Delete notifications successfully',
      },
      { status: httpStatus.OK }
    );
  }
);

