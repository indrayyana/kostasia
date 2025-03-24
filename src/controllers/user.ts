import { Context } from 'hono';
import httpStatus from 'http-status';
import * as userService from '@/services/user';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';
import { createUserBodyType, updateUserBodyType, userParamsType } from '@/validations/user';

export const createUser = catchAsync(async (c: Context) => {
  // @ts-expect-error off
  const validatedBody: createUserBodyType = c.req.valid('json');

  const user = await userService.createUser(validatedBody);

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
  // @ts-expect-error off
  const validatedParam: userParamsType = c.req.valid('param');

  const user = await userService.getUserById(validatedParam.userId);
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
  // @ts-expect-error off
  const validatedParam: userParamsType = c.req.valid('param');
  // @ts-expect-error off
  const validatedBody: updateUserBodyType = c.req.valid('json');

  const user = await userService.updateUserById(validatedParam.userId, validatedBody);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Update user successfully',
    user,
  });
});

export const deleteUser = catchAsync(async (c: Context) => {
  // @ts-expect-error off
  const validatedParam: userParamsType = c.req.valid('param');

  await userService.deleteUserById(validatedParam.userId);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Delete user successfully',
  });
});

