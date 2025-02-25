import { NextResponse } from 'next/server';
import httpStatus from 'http-status';

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

