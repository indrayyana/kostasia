import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import userValidation from '@/validations/user';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';
import userService from '@/services/user';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(async (): Promise<NextResponse> => {
  const user = await userService.getAllUsers();

  return NextResponse.json(
    {
      code: httpStatus.OK,
      status: 'success',
      message: 'Get users successfully',
      user,
    },
    { status: httpStatus.OK }
  );
});

export const POST = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();

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

    return NextResponse.json(
      {
        code: httpStatus.CREATED,
        status: 'success',
        message: 'Create user successfully',
        user,
      },
      { status: httpStatus.CREATED }
    );
  }
);

