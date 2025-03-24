import httpStatus from 'http-status';
import prisma from '@/lib/prisma';
import ApiError from '@/utils/ApiError';
import { createUserBodyType, updateUserBodyType } from '@/validations/user';

interface GoogleLoginInterface {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
}

export const createUser = async (userBody: createUserBodyType) => {
  const user = await prisma.user.create({
    data: userBody,
  });

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

  return user;
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {
      dibuat_pada: 'desc',
    },
  });
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      user_id: userId,
    },
  });

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getUserWithPermission = async () => {
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

export const updateUserById = async (userId: string, updateBody: updateUserBodyType) => {
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

  return user;
};

export const updateGoogleUserById = async (userId: string, updateBody: GoogleLoginInterface) => {
  let user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user = await prisma.user.update({
    where: {
      user_id: userId,
    },
    data: {
      nama: updateBody.name as string,
      email: updateBody.email as string,
      foto: updateBody.picture || null,
    },
  });

  return user;
};

export const deleteUserById = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return await prisma.user.delete({
    where: {
      user_id: userId,
    },
  });
};

