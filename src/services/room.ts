import prisma from '@/lib/prisma';
import { CabangType, RoomInterface } from '@/types/room';
import * as cacheService from './cache';

interface RoomsWithCacheInterface {
  cache: boolean;
  kamar: RoomInterface[] | null;
}

export const getAllRooms = async (): Promise<RoomsWithCacheInterface> => {
  const cachedRooms = await cacheService.get('rooms');
  if (cachedRooms) {
    return {
      cache: true,
      kamar: cachedRooms as RoomInterface[],
    };
  }

  const kamar = await prisma.kamar.findMany({
    orderBy: {
      kamar_id: 'asc',
    },
  });

  await cacheService.set('rooms', kamar);

  return { cache: false, kamar };
};

export const getRoomsByCabang = async (cabang: CabangType): Promise<RoomsWithCacheInterface> => {
  const cachedRoom = await cacheService.get(`rooms:${cabang}`);
  if (cachedRoom) {
    return {
      cache: true,
      kamar: cachedRoom as RoomInterface[],
    };
  }

  const kamar = await prisma.kamar.findMany({
    where: { cabang },
    orderBy: {
      kamar_id: 'asc',
    },
  });

  await cacheService.set(`rooms:${cabang}`, kamar);

  return { cache: false, kamar };
};

export const getRoomById = async (id: number, cabang: CabangType): Promise<RoomInterface | null> => {
  const kamar = await prisma.kamar.findFirst({
    where: {
      kamar_id: id,
      cabang: cabang,
    },
  });

  return kamar;
};

