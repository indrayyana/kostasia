import { NextResponse } from 'next/server';
import httpStatus from 'http-status';
import prisma from '@/lib/prisma';
import catchAsync from '@/utils/catchAsync';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(async (): Promise<NextResponse> => {
  const kamar = await prisma.kamar.findMany({
    where: { cabang: 'denpasar' },
    orderBy: {
      kamar_id: 'asc',
    },
  });

  return NextResponse.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get Denpasar rooms successfully',
    kamar,
  });
});

