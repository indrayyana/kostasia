import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';
import { Context } from 'hono';
import transactionService from '@/services/transaction';
import { createTransaction } from '@/lib/midtrans/transaction';
import catchAsync from '@/utils/catchAsync';

export const getTransactions = catchAsync(async (c: Context) => {
  const transactions = await transactionService.getAllTransactions();

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get transactions successfully',
    transactions,
  });
});

export const saveTransaction = catchAsync(async (c: Context) => {
  const body = await c.req.json();

  const orderId = uuidv4();

  const params = {
    transaction_details: {
      order_id: orderId,
      gross_amount: body.transaction.total,
    },
    customer_details: {
      first_name: body.user.fullname,
      email: body.user.email,
      phone: body.user.phone,
    },
  };

  const resTransaction = await createTransaction(params);

  await transactionService.saveTransaction({
    transaksi_id: orderId,
    total: body.transaction.total,
    user_id: body.user.id,
    kamar_id: body.transaction.room,
    token: resTransaction.token,
  });

  return c.json(
    {
      code: httpStatus.CREATED,
      status: 'success',
      message: 'Create transaction successfully',
      transaction: resTransaction,
    },
    httpStatus.CREATED
  );
});
