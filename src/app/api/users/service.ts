import prisma from '@/lib/prisma';

export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      user_id: id,
    },
  });

  return user;
}
