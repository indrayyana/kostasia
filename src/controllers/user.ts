import { Context } from 'hono';
import httpStatus from 'http-status';
import userService from '@/services/user';
import userValidation from '@/validations/user';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const createUser = catchAsync(async (c: Context) => {
  const body = await c.req.json();

  const validation = userValidation.createUser.safeParse({
    nama: body.nama,
    email: body.email,
    telepon: body.telepon,
    role: body.role,
  });
  if (!validation.success) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Bad Request',
      validation.error.flatten().fieldErrors
    );
  }

  const user = await userService.createUser(body);

  return c.json(
    {
      code: httpStatus.CREATED,
      status: 'success',
      message: 'Create user successfully',
      user,
    },
    httpStatus.CREATED
  );
});

export const getUsers = catchAsync(async (c: Context) => {
  const user = await userService.getAllUsers();

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get users successfully',
    user,
  });
});

export const getUserById = catchAsync(async (c: Context) => {
  const id = c.req.param('userId');

  const validation = userValidation.getUser.safeParse({ user_id: id });
  if (!validation.success) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid user ID',
      validation.error.flatten().fieldErrors
    );
  }

  const user = await userService.getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get user successfully',
    user,
  });
});

export const getUserProfile = catchAsync(async (c: Context) => {
  const user = c.get('user');

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get user successfully',
    user,
  });
});

export const updateUser = catchAsync(async (c: Context) => {
  const id = c.req.param('userId');
  const body = await c.req.json();

  const validation = userValidation.updateUser.safeParse({
    user_id: id,
    nama: body.nama,
    email: body.email,
    telepon: body.telepon,
  });
  if (!validation.success) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid user ID',
      validation.error.flatten().fieldErrors
    );
  }

  const user = await userService.updateUserById(id, body);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Update user successfully',
    user,
  });
});

export const deleteUser = catchAsync(async (c: Context) => {
  const id = c.req.param('userId');

  const validation = userValidation.deleteUser.safeParse({ user_id: id });
  if (!validation.success) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid user ID',
      validation.error.flatten().fieldErrors
    );
  }

  await userService.deleteUserById(id);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Delete user successfully',
  });
});

