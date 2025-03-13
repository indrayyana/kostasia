import httpStatus from 'http-status';
import { Context } from 'hono';
import notificationService from '@/services/notification';
import notifValidation from '@/validations/notif';
import userService from '@/services/user';
import tokenService from '@/services/token';
import userValidation from '@/validations/user';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const createNotification = catchAsync(async (c: Context) => {
  const body = await c.req.json();

  const validation = notifValidation.createNotif.safeParse({
    judul: body.judul,
    deskripsi: body.deskripsi,
    user_id: body.user_id,
  });
  if (!validation.success) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Bad Request',
      validation.error.flatten().fieldErrors
    );
  }

  const notification = await notificationService.createNotification(body);

  return c.json(
    {
      code: httpStatus.CREATED,
      status: 'success',
      message: 'Create notification successfully',
      notification,
    },
    httpStatus.CREATED
  );
});

export const createNotificationToken = catchAsync(async (c: Context) => {
  const { token, user_id } = await c.req.json();

  const validation = notifValidation.saveNotifToken.safeParse({
    token,
    user_id,
  });
  if (!validation.success) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Bad Request',
      validation.error.flatten().fieldErrors
    );
  }

  await tokenService.saveToken(token, user_id, null, 'notification');

  return c.json(
    {
      code: httpStatus.CREATED,
      status: 'success',
      message: 'Save FCM token successfully',
    },
    httpStatus.CREATED
  );
});

export const getNotifications = catchAsync(async (c: Context) => {
  const notifications = await notificationService.getAllNotification();

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get notifications successfully',
    notifications,
  });
});

export const getNotification = catchAsync(async (c: Context) => {
  const userId = c.req.param('id');

  const validation = notifValidation.getNotif.safeParse({ user_id: userId });
  if (!validation.success) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid ID',
      validation.error.flatten().fieldErrors
    );
  }

  const notifications = await notificationService.getAllNotifByUserId(userId);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get notification successfully',
    notifications,
  });
});

export const getNotificationTokenUser = catchAsync(async (c: Context) => {
  const userId = c.req.param('id');

  const validation = userValidation.getUser.safeParse({ user_id: userId });
  if (!validation.success) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid user ID',
      validation.error.flatten().fieldErrors
    );
  }

  const token = await tokenService.getNotificationToken(userId);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get FCM token successfully',
    token: token.token,
  });
});

export const getNotificationTokenWithUsers = catchAsync(async (c: Context) => {
  const users = await userService.getUserWithPermission();

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get users with notification permission successfully',
    users,
  });
});

export const deleteNotification = catchAsync(async (c: Context) => {
  const id = parseInt(c.req.param('id'), 10);

  const validation = notifValidation.deleteNotif.safeParse({
    notifikasi_id: id,
  });
  if (!validation.success) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid ID',
      validation.error.flatten().fieldErrors
    );
  }

  await notificationService.deleteNotificationById(id);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Delete notification successfully',
  });
});

export const deleteNotifications = catchAsync(async (c: Context) => {
  const idParam = c.req.query('id');
  if (!idParam) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ID parameter is required');
  }

  const ids = idParam.split(',').map(Number).filter(Boolean);
  if (ids.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID format');
  }

  await notificationService.deleteAllNotificationById(ids);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Delete notifications successfully',
  });
});

