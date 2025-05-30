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
    retry: false,
  });
};

export const useFetchNotificationsUser = (userId: string) => {
  return useQuery({
    queryKey: ['user.notifications', userId],
    queryFn: async () => {
      const response = await api.get(`/notifications/${userId}`);

      return response.data;
    },
    enabled: !!userId,
    retry: false,
  });
};

export const useCreateNotification = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await api.post('/notifications', body);

      return response;
    },
    retry: false,
    onSuccess,
    onError,
  });
};

export const useDeleteNotification = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/notifications/${id}`);

      return response;
    },
    retry: false,
    onSuccess,
    onError,
  });
};

export const useBulkDeleteNotification = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (ids) => {
      const response = await api.delete(`/notifications?id=${ids}`);

      return response;
    },
    retry: false,
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
    retry: false,
  });
};

