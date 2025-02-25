'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { CabangType } from '@/types/room';
import { ErrorInterface } from '@/types/error';

export const useFetchRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await api.get('/rooms');

      return response.data;
    },
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
  });
};

