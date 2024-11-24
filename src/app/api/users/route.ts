import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json({
      code: 200,
      status: 'success',
      message: 'Get users successfully',
      user,
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

