/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '@/lib/prisma';
import { StatusTransaksi } from '@/types/transaction';

export const saveTransaction = async (data: any) => {
  const transaction = await prisma.transaksi.create({
    data,
  });

  return transaction;
};

export const getAllTransactions = async () => {
  const transactions = await prisma.transaksi.findMany({
    orderBy: {
      dibuat_pada: 'desc',
    },
    include: {
      user: {
        select: {
          nama: true,
        },
      },
      kamar: {
        select: {
          nama: true,
          cabang: true,
        },
      },
    },
  });

  return transactions;
};

export const getTransactionById = async (transactionId: string) => {
  const transactions = await prisma.transaksi.findFirst({
    where: {
      transaksi_id: transactionId,
    },
    include: {
      user: {
        select: {
          nama: true,
        },
      },
      kamar: {
        select: {
          nama: true,
          cabang: true,
        },
      },
    },
  });

  return transactions;
};

export const updateTransactionById = async (transactionId: string, status: StatusTransaksi) => {
  const updateTransaction = await prisma.transaksi.update({
    where: {
      transaksi_id: transactionId,
    },
    data: {
      status,
    },
  });

  return updateTransaction;
};
