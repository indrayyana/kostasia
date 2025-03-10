import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { ContextParams } from '@/types/context';
import roomService from '@/services/room';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
  async (req: NextRequest, ctx: ContextParams): Promise<NextResponse> => {
    const id = ctx.params.id;

    const kamar = await roomService.getRoomById(Number(id), 'klungkung');
    if (!kamar) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Kamar not found');
    }

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        message: `Get Klungkung room successfully`,
        kamar,
      },
      { status: httpStatus.OK }
    );
  }
);

