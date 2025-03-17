'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await api.post('/transactions', body);

      return response;
    },
  });
};

export const useFetchTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await api.get('/transactions');

      return response.data;
    },
  });
};

export const useUpdateTransaction = () => {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await api.patch(
        `/transactions/detail?order_id=${orderId}`
      );

      return response;
    },
  });
};
