'use client';

import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await api.post('/transactions', body);

      return response;
    },
  });
};

