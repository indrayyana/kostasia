import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const kamar = await prisma.kamar.findMany({
      where: { cabang: 'Denpasar' },
      orderBy: {
        kamar_id: 'asc',
      },
    });

    return NextResponse.json({
      code: 200,
      status: 'success',
      message: 'Get Denpasar rooms successfully',
      kamar,
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      status: 'error',
      message: 'Internal Server Error',
      errors: error,
    });
  }
}

