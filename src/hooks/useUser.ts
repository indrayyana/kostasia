'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { UserDashboardInterface, UserInterface } from '@/types/user';
import {
  bulkDeleteUserQueryType,
  createUserBodyType,
  fileUploadSchemaType,
  updateUserBodyType,
  updateUserByAdminBodyType,
  userParamsType,
} from '@/validations/user';

export const useCreateUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body: createUserBodyType) => {
      const response = await api.post('/users', body);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/users');

      return response.data;
    },
  });
};

export const useFetchUserProfile = (token: string | null) => {
  return useQuery({
    queryKey: ['user.profile'],
    queryFn: async (): Promise<UserInterface> => {
      const response = await api.get('/users/profile');

      return response.data.user;
    },
    enabled: !!token,
  });
};

export const useFetchUserDashboard = () => {
  return useQuery({
    queryKey: ['user.dashboard'],
    queryFn: async (): Promise<UserDashboardInterface> => {
      const response = await api.get('/users/dashboard');

      return response.data.dashboard;
    },
  });
};

export const useUpdateUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body: updateUserBodyType) => {
      const response = await api.patch(`/users/update`, body);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useUpdateUserByAdmin = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ param, body }: { param: userParamsType; body: updateUserByAdminBodyType }) => {
      const response = await api.patch(`/users/${param.userId}`, body);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useDeleteUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (param: userParamsType) => {
      const response = await api.delete(`/users/${param.userId}`);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useBulkDeleteUsers = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (query: bulkDeleteUserQueryType) => {
      const response = await api.delete(`/users?id=${query.id}`);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useUploadProfile = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ param, body }: { param: userParamsType; body: fileUploadSchemaType }) => {
      const formData = new FormData();
      formData.append('file', body.file);

      const response = await api.post(`/users/${param.userId}/upload-profile`, formData);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useUploadKtp = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ param, body }: { param: userParamsType; body: fileUploadSchemaType }) => {
      const formData = new FormData();
      formData.append('file', body.file);

      const response = await api.post(`/users/${param.userId}/upload-ktp`, formData);

      return response;
    },
    onSuccess,
    onError,
  });
};

