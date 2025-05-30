/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import prisma from '@/lib/prisma';
import ApiError from '@/utils/ApiError';

export const getAllNotification = async () => {
  const notifications = await prisma.notifikasi.findMany({
    orderBy: {
      dibuat_pada: 'desc',
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
};

export const getAllNotifByUserId = async (userId: string) => {
  const notifications = await prisma.notifikasi.findMany({
    where: {
      user_id: userId,
    },
  });

  return notifications;
};

export const createNotification = async (data: any) => {
  const notification = await prisma.notifikasi.create({
    data,
  });

  return notification;
};

export const deleteNotificationById = async (notificationId: number) => {
  const notification = await prisma.notifikasi.findFirst({
    where: {
      notifikasi_id: notificationId,
    },
  });

  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
  }

  await prisma.notifikasi.delete({
    where: {
      notifikasi_id: notificationId,
    },
  });

  return notification;
};

export const deleteAllNotificationById = async (notificationsId: number[]) => {
  return await prisma.$transaction(async (tx) => {
    const notifications = await tx.notifikasi.findMany({
      where: { notifikasi_id: { in: notificationsId } },
    });

    const foundIds = notifications.map((notif) => notif.notifikasi_id);
    const missingIds = notificationsId.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new ApiError(httpStatus.NOT_FOUND, `Notifications not found for ID: ${missingIds.join(', ')}`);
    }

    const deletedNotifications = await tx.notifikasi.deleteMany({
      where: { notifikasi_id: { in: notificationsId } },
    });

    return deletedNotifications;
  });
};
