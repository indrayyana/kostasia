/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";

const transactionService = {
  createTransaction: async (data: any) => {
    const transaction = await prisma.transaksi.create({
      data,
    });

    return transaction;
  },

  getAllTransactions: async () => {
    const transactions = await prisma.transaksi.findMany({
      orderBy: {
        dibuat_pada: "desc",
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
          },
        },
      },
    });

    return transactions;
  },
};

export default transactionService;
