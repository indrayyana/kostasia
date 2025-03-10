import prisma from '@/lib/prisma';
import { CabangType } from '@/types/room';

const roomService = {
  getRoomById: async (id: number, cabang: CabangType) => {
    const kamar = await prisma.kamar.findFirst({
      where: {
        kamar_id: id,
        cabang: cabang,
      },
    });

    return kamar;
  },

  getAllRooms: async () => {
    const kamar = await prisma.kamar.findMany({
      orderBy: {
        kamar_id: 'asc',
      },
    });

    return kamar;
  },

  getRoomsByCabang: async (cabang: CabangType) => {
    const kamar = await prisma.kamar.findMany({
      where: { cabang },
      orderBy: {
        kamar_id: 'asc',
      },
    });

    return kamar;
  },
};

export default roomService;

