'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useFetchNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await api.get('/notifications');

      return response.data;
    },
  });
};

export const useCreateNotification = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await api.post('/notifications', body);

      return response;
    },
    onSuccess,
  });
};

export const useDeleteNotification = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/notifications/${id}`);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useFetchUsersWithNotification = () => {
  return useQuery({
    queryKey: ['notifications.users'],
    queryFn: async () => {
      const response = await api.get('/notifications/users');

      return response.data;
    },
  });
};

