import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import httpStatus from 'http-status';
import { getUserById } from '@/services/user';
import { ContextParams } from '@/types/context';
import userValidation from '@/validations/user';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, ctx: ContextParams) {
  try {
    const id = ctx.params.id;

    const validation = userValidation.getUser.safeParse({ user_id: id });
    if (!validation.success) {
      return NextResponse.json(
        {
          code: 400,
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
          code: 404,
          status: 'error',
          message: 'User not found',
        },
        { status: httpStatus.NOT_FOUND }
      );
    }

    return NextResponse.json({
      code: 200,
      status: 'success',
      message: 'Get user successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        code: 500,
        status: 'error',
        message: 'Internal Server Error',
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PATCH(req: NextRequest, ctx: ContextParams) {
  try {
    const id = ctx.params.id;
    const body = await req.json();

    const validation = userValidation.updateUser.safeParse({
      user_id: id,
      nama: body.nama,
      email: body.email,
      telepon: body.telepon,
    });
    if (!validation.success) {
      const { errors } = validation.error;

      return NextResponse.json({
        code: 400,
        status: 'error',
        message: 'Invalid user ID',
        errors: errors,
      });
    }

    let user = await getUserById(id);
    if (!user) {
      return NextResponse.json({
        code: 404,
        status: 'error',
        message: 'User not found',
      });
    }

    user = await prisma.user.update({
      where: {
        user_id: id,
      },
      data: body,
    });

    return NextResponse.json({
      code: 200,
      status: 'success',
      message: 'Update user successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      code: 500,
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

export async function DELETE(req: NextRequest, ctx: ContextParams) {
  try {
    const id = ctx.params.id;

    const validation = userValidation.deleteUser.safeParse({ user_id: id });
    if (!validation.success) {
      const { errors } = validation.error;

      return NextResponse.json({
        code: 400,
        status: 'error',
        message: 'Invalid user ID',
        errors: errors,
      });
    }

    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({
        code: 404,
        status: 'error',
        message: 'User not found',
      });
    }

    await prisma.user.delete({
      where: {
        user_id: id,
      },
    });

    return NextResponse.json({
      code: 200,
      status: 'success',
      message: 'Delete user successfully',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      code: 500,
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

