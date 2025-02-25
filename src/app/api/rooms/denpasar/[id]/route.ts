import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { ContextParams } from '@/types/context';
import { getRoomsById } from '@/services/rooms';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, ctx: ContextParams) {
  try {
    const id = ctx.params.id;

    const kamar = await getRoomsById(id, 'denpasar');
    if (!kamar) {
      return NextResponse.json(
        {
          code: 404,
          status: 'error',
          message: 'Kamar not found',
        },
        { status: httpStatus.NOT_FOUND }
      );
    }

    return NextResponse.json({
      code: 200,
      status: 'success',
      message: `Get Denpasar room successfully`,
      kamar,
    });
  } catch (error) {
    return NextResponse.json(
      {
        code: 500,
        status: 'error',
        message: 'Internal Server Error',
        errors: error,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

