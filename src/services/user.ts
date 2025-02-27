import prisma from '@/lib/prisma';
import httpStatus from 'http-status';
import ApiError from '@/utils/ApiError';
import { RoleType } from '@/types/user';

interface GoogleLoginInterface {
  name?: string;
  email?: string;
  picture?: string;
}

interface UserBodyInterface {
  user_id?: string;
  nama: string;
  telepon: string;
  email: string;
  role: RoleType;
  foto?: string;
  ktp?: string;
}

const userService = {
  createUser: async (userBody: UserBodyInterface) => {
    const user = await prisma.user.create({
      data: userBody,
    });

    return user;
  },

  createGoogleUser: async (userBody: GoogleLoginInterface) => {
    const user = await prisma.user.create({
      data: {
        nama: userBody.name,
        email: userBody.email,
        foto: userBody.picture || null,
      },
    });

    return user;
  },

  getAllUsers: async () => {
    return await prisma.user.findMany({
      orderBy: {
        dibuat_pada: 'desc',
      },
    });
  },

  getUserById: async (id: string) => {
    const user = await prisma.user.findFirst({
      where: {
        user_id: id,
      },
    });

    return user;
  },

  getUserByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  },

  getUserWithPermission: async () => {
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
  },

  updateUserById: async (userId: string, updateBody: UserBodyInterface) => {
    let user = await userService.getUserById(userId);
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
  },

  updateGoogleUserById: async (
    userId: string,
    updateBody: GoogleLoginInterface
  ) => {
    let user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    user = await prisma.user.update({
      where: {
        user_id: userId,
      },
      data: {
        nama: updateBody.name,
        email: updateBody.email,
        foto: updateBody.picture || null,
      },
    });

    return user;
  },

  deleteUserById: async (userId: string) => {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    return await prisma.user.delete({
      where: {
        user_id: userId,
      },
    });
  },
};

export default userService;

