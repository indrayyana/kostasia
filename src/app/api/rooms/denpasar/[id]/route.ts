import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { ContextParams } from '@/types/context';
import { getRoomsById } from '@/services/rooms';
import catchAsync from '@/utils/catchAsync';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
  async (req: NextRequest, ctx: ContextParams): Promise<NextResponse> => {
    const id = ctx.params.id;

    const kamar = await getRoomsById(id, 'denpasar');
    if (!kamar) {
      return NextResponse.json(
        {
          code: httpStatus.NOT_FOUND,
          status: 'error',
          message: 'Kamar not found',
        },
        { status: httpStatus.NOT_FOUND }
      );
    }

    return NextResponse.json({
      code: httpStatus.OK,
      status: 'success',
      message: `Get Denpasar room successfully`,
      kamar,
    });
  }
);

