'use client';

import { useContext, createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserInterface } from '@/types/user';
import api from '@/lib/axios';
import { deleteToken, getToken } from '@/utils/cookies';
import { useFetchUserProfile } from '@/hooks/useUser';

interface AuthContextType {
  token: string | null;
  user: UserInterface | null;
  isPending: boolean;
  refetch: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadToken = async () => {
      const accessToken = await getToken();
      if (!!accessToken) {
        setToken(accessToken);
      }
    };

    loadToken();
  }, []);

  const { data, refetch, isPending, isError } = useFetchUserProfile(token);

  useEffect(() => {
    if (!isPending) {
      if (isError) {
        setUser(null);
      } else if (data) {
        setUser(data);
      }
    }
  }, [data, isPending, isError]);

  const logout = async () => {
    const res = await api.post('/auth/logout');
    if (res.status !== 200) {
      throw new Error('Gagal logout, coba lagi.');
    }

    setUser(null);
    setToken(null);
    deleteToken();
    router.push('/');
  };

  return <AuthContext.Provider value={{ token, user, refetch, isPending, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

