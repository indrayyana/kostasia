import { NextResponse } from 'next/server';
import httpStatus from 'http-status';
import catchAsync from '@/utils/catchAsync';
import roomService from '@/services/rooms';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(async (): Promise<NextResponse> => {
  const kamar = await roomService.getRoomsByCabang('denpasar');

  return NextResponse.json(
    {
      code: httpStatus.OK,
      status: 'success',
      message: 'Get Denpasar rooms successfully',
      kamar,
    },
    { status: httpStatus.OK }
  );
});

