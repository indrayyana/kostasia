import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import httpStatus from 'http-status';
import { getUserById } from '@/services/user';
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
      return NextResponse.json(
        {
          code: httpStatus.BAD_REQUEST,
          status: 'error',
          message: 'Invalid user ID',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json(
        {
          code: httpStatus.NOT_FOUND,
          status: 'error',
          message: 'User not found',
        },
        { status: httpStatus.NOT_FOUND }
      );
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

    let user = await getUserById(id);
    if (!user) {
      return NextResponse.json(
        {
          code: httpStatus.NOT_FOUND,
          status: 'error',
          message: 'User not found',
        },
        {
          status: httpStatus.NOT_FOUND,
        }
      );
    }

    user = await prisma.user.update({
      where: {
        user_id: id,
      },
      data: body,
    });

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

    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json(
        {
          code: httpStatus.NOT_FOUND,
          status: 'error',
          message: 'User not found',
        },
        { status: httpStatus.NOT_FOUND }
      );
    }

    await prisma.user.delete({
      where: {
        user_id: id,
      },
    });

    return NextResponse.json({
      code: httpStatus.OK,
      status: 'success',
      message: 'Delete user successfully',
    });
  }
);

