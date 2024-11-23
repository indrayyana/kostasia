import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST() {
  // const user = await prisma.user.findFirst({
  //   where: {
  //     email: data.email,
  //   },
  // });

  // if (user) {
  //   data.role = data.role;
  //   await prisma.user.update({
  //     where: {
  //       id: data.id,
  //     },
  //     data: data,
  //   });

  //   return data;
  // } else {
  //   data.role = 'pengunjung';
  //   await prisma.user.create({
  //     data: data,
  //   });

  //   return data;
  // }

  return NextResponse.json({ status: 200, message: 'Success' });
}

// TODO: check

