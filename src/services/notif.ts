/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import prisma from '@/lib/prisma';
import ApiError from '@/utils/ApiError';

const notifService = {
  getAllNotif: async () => {
    const notifications = await prisma.notifikasi.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return notifications;
  },

  getAllNotifByUserId: async (userId: string) => {
    const notifications = await prisma.notifikasi.findMany({
      where: {
        user_id: userId,
      },
    });

    return notifications;
  },

  createNotif: async (data: any) => {
    const notification = await prisma.notifikasi.create({
      data,
    });

    return notification;
  },

  deleteNotifById: async (id: number) => {
    const notification = await prisma.notifikasi.findFirst({
      where: {
        notifikasi_id: id,
      },
    });

    if (!notification) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Notif not found');
    }

    await prisma.notifikasi.delete({
      where: {
        notifikasi_id: id,
      },
    });

    return notification;
  },
};

export default notifService;

