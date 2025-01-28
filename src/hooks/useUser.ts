'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { UserInterface } from '@/types/user';

const useUser = () => {
  const [user, setUser] = useState<UserInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await api.get('/users/profile');
        setUser(data.user);
      } catch (error) {
        console.error(error);
        setError('Terjadi kesalahan saat menampilkan data');
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  return {
    user,
    loading,
    error,
  };
};

export default useUser;

