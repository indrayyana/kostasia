import prisma from '@/lib/prisma';
import { CabangType } from '@/types/room';

export async function getRoomsById(id: string, cabang: CabangType) {
  const kamar = await prisma.kamar.findFirst({
    where: {
      kamar_id: Number(id),
      cabang: cabang,
    },
  });

  return kamar;
}

