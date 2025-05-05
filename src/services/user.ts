import httpStatus from 'http-status';
import prisma from '@/lib/prisma';
import ApiError from '@/utils/ApiError';
import { createUserBodyType, updateUserBodyType, updateUserByAdminBodyType } from '@/validations/user';
import * as cacheService from './cache';
import { UserDBInterface } from '@/types/user';

interface GoogleLoginInterface {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
}

interface UsersWithCacheInterface {
  cache: boolean;
  user: UserDBInterface[] | null;
}

export const createUser = async (userBody: createUserBodyType) => {
  const user = await prisma.user.create({
    data: userBody,
  });

  await cacheService.del('users');

  return user;
};

export const createGoogleUser = async (userBody: GoogleLoginInterface) => {
  const user = await prisma.user.create({
    data: {
      nama: userBody.name as string,
      email: userBody.email as string,
      foto: userBody.picture || null,
    },
  });

  await cacheService.del('users');

  return user;
};

export const getAllUsers = async (): Promise<UsersWithCacheInterface> => {
  const cachedUsers = await cacheService.get('users');
  if (cachedUsers) {
    return {
      cache: true,
      user: cachedUsers as UserDBInterface[],
    };
  }

  const user = await prisma.user.findMany({
    orderBy: {
      dibuat_pada: 'desc',
    },
  });

  await cacheService.set('users', user);

  return { cache: false, user };
};

export const getUserById = async (userId: string): Promise<UserDBInterface | null> => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
  });

  return user;
};

export const getUserByEmail = async (email: string): Promise<UserDBInterface | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getUserWithPermission = async () => {
  // TODO: add cache
  const users = await prisma.token.findMany({
    where: {
      tipe: 'notification',
    },
    select: {
      user_id: true,
      token: true,
      user: {
        select: {
          nama: true,
        },
      },
    },
  });

  return users;
};

export const updateUserById = async (userId: string, updateBody: updateUserBodyType | updateUserByAdminBodyType) => {
  let user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user = await prisma.user.update({
    where: {
      user_id: userId,
    },
    data: updateBody,
  });

  await cacheService.del('users');

  return user;
};

export const updateGoogleUserById = async (userId: string, updateBody: GoogleLoginInterface) => {
  let user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const data: updateUserByAdminBodyType = {
    nama: updateBody.name as string,
    email: updateBody.email as string,
  };

  if (!user.foto) {
    data.foto = updateBody.picture;
  }

  user = await prisma.user.update({
    where: {
      user_id: userId,
    },
    data,
  });

  await cacheService.del('users');

  return user;
};

export const deleteUserById = async (userId: string) => {
  let user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user = await prisma.user.delete({
    where: {
      user_id: userId,
    },
  });

  await cacheService.del('users');

  return user;
};

export const deleteAllUserById = async (userId: string[]) => {
  return await prisma.$transaction(async (tx) => {
    const users = await tx.user.findMany({
      where: { user_id: { in: userId } },
    });

    const foundIds = users.map((user) => user.user_id);
    const missingIds = userId.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new ApiError(httpStatus.NOT_FOUND, `users not found for ID: ${missingIds.join(', ')}`);
    }

    await cacheService.del('users');

    const deletedUsers = await tx.user.deleteMany({
      where: { user_id: { in: userId } },
    });

    return deletedUsers;
  });
};
