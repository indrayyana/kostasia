import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const kamar = await prisma.kamar.findMany({
    where: { cabang: 'Denpasar' },
    orderBy: {
      kamar_id: 'asc',
    },
  });

  return NextResponse.json({ status: 200, message: 'Success', kamar });
}

