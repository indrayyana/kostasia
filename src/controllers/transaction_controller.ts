import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';
import { Context } from 'hono';
import * as transactionService from '@/services/transaction';
import { createTransaction, getTransaction } from '@/lib/midtrans/transaction';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const getTransactions = catchAsync(async (c: Context) => {
  const transactions = await transactionService.getAllTransactions();

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get transactions successfully',
    transactions,
  });
});

export const getTransactionByOrderId = catchAsync(async (c: Context) => {
  const transaksi_id = c.req.query('order_id');

  const transaction = await transactionService.getTransactionById(transaksi_id as string);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }

  const detailTransaction = await getTransaction(transaction.transaksi_id);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get transaction successfully',
    transaction: {
      ...transaction,
      status: detailTransaction.transaction_status,
    },
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

export const updateTransactionByOrderId = catchAsync(async (c: Context) => {
  const transaksi_id = c.req.query('order_id');

  const transaction = await transactionService.getTransactionById(transaksi_id as string);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }

  const detailTransaction = await getTransaction(transaction.transaksi_id);
  const updatedTransaction = await transactionService.updateTransactionById(
    transaction.transaksi_id,
    detailTransaction.transaction_status
  );

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get transaction successfully',
    transaction: updatedTransaction,
  });
});
