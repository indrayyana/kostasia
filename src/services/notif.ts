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
      include: {
        user: {
          select: {
            nama: true,
          },
        },
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

  deleteAllNotifById: async (ids: number[]) => {
    const notifications = await prisma.notifikasi.findMany({
      where: {
        notifikasi_id: {
          in: ids,
        },
      },
    });

    const foundIds = notifications.map((notif) => notif.notifikasi_id);
    const missingIds = ids.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `Notif(s) not found for ID(s): ${missingIds.join(', ')}`
      );
    }

    await prisma.notifikasi.deleteMany({
      where: {
        notifikasi_id: {
          in: ids,
        },
      },
    });

    return notifications;
  },
};

export default notifService;

