import prisma from '@/lib/prisma';

export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      user_id: id,
    },
  });

  return user;
}

const userService = {
  getUserWithPermission: async () => {
    const users = await prisma.user.findMany({
      where: {
        token: {
          some: {
            type: 'notification',
          },
        },
      },
      select: {
        user_id: true,
        nama: true,
      },
    });

    return users;
  },
};

export default userService;

