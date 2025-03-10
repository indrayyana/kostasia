/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';

import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';
import createTransaction from '@/lib/midtrans/transaction';

export const dynamic = 'force-dynamic';

export const POST = catchAsync(
  async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();

    //   const validation = notifValidation.createNotif.safeParse({
    //     judul: body.judul,
    //     text: body.text,
    //     user_id: body.user_id,
    //   });
    //   if (!validation.success) {
    //     throw new ApiError(
    //       httpStatus.BAD_REQUEST,
    //       'Bad Request',
    //       validation.error.flatten().fieldErrors
    //     );
    //   }

    const orderId = uuidv4();

    const params = {
      transaction_details: {
        order_id: orderId,
        gross_amount: body.transaction.total,
      },
      customer_details: {
        first_name: body.user.fullname,
        email: body.user.email,
        phone: '08111222333',
      },
    };

    const resTransaction = await createTransaction(params);

    return NextResponse.json(
      {
        code: httpStatus.CREATED,
        status: 'success',
        message: 'Create transaction successfully',
        transaction: resTransaction,
      },
      { status: httpStatus.CREATED }
    );
  }
);

