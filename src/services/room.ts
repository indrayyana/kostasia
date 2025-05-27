import httpStatus from 'http-status';
import prisma from '@/lib/prisma';
import ApiError from '@/utils/ApiError';
import { CabangType, RoomInterface } from '@/types/room';
import * as cacheService from './cache';
import { createRoomBodyType, updateRoomBodyType } from '@/validations/room';

interface RoomsWithCacheInterface {
  cache: boolean;
  kamar: RoomInterface[] | null;
}

export const createRoom = async (roomBody: createRoomBodyType) => {
  const kamar = await prisma.kamar.create({
    data: roomBody,
  });

  await cacheService.del('rooms');
  await cacheService.del('rooms:denpasar');
  await cacheService.del('rooms:klungkung');

  return kamar;
};

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

export const getRoomById = async (id: number, cabang?: CabangType): Promise<RoomInterface | null> => {
  const kamar = await prisma.kamar.findFirst({
    where: {
      kamar_id: id,
      ...(cabang && { cabang }),
    },
  });

  return kamar;
};

export const updateRoomById = async (kamarId: number, updateBody: updateRoomBodyType) => {
  let kamar = await getRoomById(kamarId);
  if (!kamar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }

  kamar = await prisma.kamar.update({
    where: {
      kamar_id: kamarId,
    },
    data: updateBody,
  });

  await cacheService.del('rooms');
  await cacheService.del('rooms:denpasar');
  await cacheService.del('rooms:klungkung');

  return kamar;
};

export const deleteRoomById = async (kamarId: number) => {
  let kamar = await getRoomById(kamarId);
  if (!kamar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }

  kamar = await prisma.kamar.delete({
    where: {
      kamar_id: kamarId,
    },
  });

  await cacheService.del('rooms');
  await cacheService.del('rooms:denpasar');
  await cacheService.del('rooms:klungkung');

  return kamar;
};

export const deleteAllRoomById = async (kamarId: number[]) => {
  return await prisma.$transaction(async (tx) => {
    const rooms = await tx.kamar.findMany({
      where: { kamar_id: { in: kamarId } },
    });

    const foundIds = rooms.map((room) => room.kamar_id);
    const missingIds = kamarId.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new ApiError(httpStatus.NOT_FOUND, `rooms not found for ID: ${missingIds.join(', ')}`);
    }

    await cacheService.del('rooms');
    await cacheService.del('rooms:denpasar');
    await cacheService.del('rooms:klungkung');

    const deletedRooms = await tx.kamar.deleteMany({
      where: { kamar_id: { in: kamarId } },
    });

    return deletedRooms;
  });
};

