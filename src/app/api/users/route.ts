import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import prisma from '@/lib/prisma';
import userValidation from '@/validations/user';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(
      {
        code: httpStatus.OK,
        status: 'success',
        message: 'Get users successfully',
        user,
      },
      { status: httpStatus.OK }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        code: httpStatus.INTERNAL_SERVER_ERROR,
        status: 'error',
        message: 'Internal Server Error',
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = userValidation.createUser.safeParse({
      nama: body.nama,
      email: body.email,
      telepon: body.telepon,
      role: body.role,
    });
    if (!validation.success) {
      return NextResponse.json(
        {
          code: httpStatus.BAD_REQUEST,
          status: 'error',
          message: 'Bad Request',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const user = await prisma.user.create({
      data: body,
    });

    return NextResponse.json(
      {
        code: httpStatus.CREATED,
        status: 'success',
        message: 'Create user successfully',
        user,
      },
      { status: httpStatus.CREATED }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        code: httpStatus.INTERNAL_SERVER_ERROR,
        status: 'error',
        message: 'Internal Server Error',
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

