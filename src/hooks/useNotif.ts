'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { NotifInterface } from '../types/notif';

const useNotif = () => {
  const [notif, setNotif] = useState<NotifInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getAllNotif() {
      try {
        const { data } = await api.get('/notifications');
        setNotif(data.notifications);
      } catch (error) {
        console.error(error);
        setError('Terjadi kesalahan saat menampilkan data');
      } finally {
        setLoading(false);
      }
    }

    getAllNotif();
  }, []);

  const addNotif = (newNotif: NotifInterface) => {
    setNotif((prev) => [newNotif, ...prev]);
  };

  const deleteNotif = async (notifId: number) => {
    setNotif((prev) => prev.filter((notif) => notif.notifikasi_id !== notifId));
  };

  return {
    notif,
    loading,
    error,
    addNotif,
    deleteNotif,
  };
};

export default useNotif;

