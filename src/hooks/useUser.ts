'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/users');

      return response.data;
    },
    retry: false,
  });
};

export const useDeleteUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/users/${id}`);

      return response;
    },
    retry: false,
    onSuccess,
    onError,
  });
};

export const useFetchUserProfile = () => {
  return useQuery({
    queryKey: ['user.profile'],
    queryFn: async () => {
      const response = await api.get('/users/profile');

      return response.data;
    },
    retry: false,
  });
};

