'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { CabangType } from '@/types/room';
import { ErrorInterface } from '@/types/error';
import {
  bulkDeleteRoomQueryType,
  createRoomBodyType,
  fileUploadSchemaType,
  roomParamsType,
  updateRoomBodyType,
} from '@/validations/room';

export const useCreateRoom = ({ onError }) => {
  return useMutation({
    mutationFn: async (body: createRoomBodyType) => {
      const response = await api.post('/rooms', body);

      return response;
    },
    onError,
  });
};

export const useFetchRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await api.get('/rooms');

      return response.data;
    },
    retry: false,
  });
};

export const useFetchRoomsByCabang = (cabang: CabangType) => {
  return useQuery({
    queryKey: ['room', cabang],
    queryFn: async () => {
      try {
        const response = await api.get(`/rooms/${cabang}`);

        return response.data;
      } catch (error) {
        const err = error as ErrorInterface;
        if (err.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });
};

export const useFetchRoomDetail = (cabang: CabangType, id: string) => {
  return useQuery({
    queryKey: ['room', cabang, id],
    queryFn: async () => {
      try {
        const response = await api.get(`/rooms/${cabang}/${id}`);

        return response.data;
      } catch (error) {
        const err = error as ErrorInterface;
        if (err.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });
};

export const useUpdateRoom = ({ onError }) => {
  return useMutation({
    mutationFn: async ({ param, body }: { param: roomParamsType; body: updateRoomBodyType }) => {
      const response = await api.patch(`/rooms/${param.cabang}/${param.roomId}`, body);

      return response;
    },
    onError,
  });
};

export const useDeleteRoom = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (param: roomParamsType) => {
      const response = await api.delete(`/rooms/${param.cabang}/${param.roomId}`);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useBulkDeleteRooms = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (query: bulkDeleteRoomQueryType) => {
      const response = await api.delete(`/rooms?id=${query.id}`);

      return response;
    },
    onSuccess,
    onError,
  });
};

export const useUploadRoomImage = ({ onError }) => {
  return useMutation({
    mutationFn: async ({ param, body }: { param: roomParamsType; body: fileUploadSchemaType }) => {
      const formData = new FormData();
      formData.append('file', body.file);

      const response = await api.post(`/rooms/${param.cabang}/${param.roomId}/upload-image`, formData);

      return response;
    },
    onError,
  });
};

