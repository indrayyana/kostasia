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
};

export default userService;

