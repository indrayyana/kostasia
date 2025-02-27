import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import userService from '@/services/user';
import { ContextParams } from '@/types/context';
import userValidation from '@/validations/user';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(
  async (req: NextRequest, ctx: ContextParams): Promise<NextResponse> => {
    const id = ctx.params.id;

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

    return NextResponse.json({
      code: httpStatus.OK,
      status: 'success',
      message: 'Get user successfully',
      user,
    });
  }
);

export const PATCH = catchAsync(
  async (req: NextRequest, ctx: ContextParams): Promise<NextResponse> => {
    const id = ctx.params.id;
    const body = await req.json();

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

    return NextResponse.json({
      code: httpStatus.OK,
      status: 'success',
      message: 'Update user successfully',
      user,
    });
  }
);

export const DELETE = catchAsync(
  async (req: NextRequest, ctx: ContextParams): Promise<NextResponse> => {
    const id = ctx.params.id;

    const validation = userValidation.deleteUser.safeParse({ user_id: id });
    if (!validation.success) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Invalid user ID',
        validation.error.flatten().fieldErrors
      );
    }

    await userService.deleteUserById(id);

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        message: 'Delete user successfully',
      },
      { status: httpStatus.OK }
    );
  }
);

