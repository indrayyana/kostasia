import prisma from '@/lib/prisma';

export const clearUsers = async () => {
  return await prisma.user.deleteMany();
};

