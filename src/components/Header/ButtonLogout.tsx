'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteToken } from '@/utils/cookies';
import api from '@/lib/axios';
import { config } from '@/utils/config';

const ButtonLogout = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      onClick={async () => {
        const res = await api.post(`${config.app.apiURL}/auth/logout`);
        if (res.status === 200) {
          deleteToken();
          router.push('/');
        }
      }}
    >
      <LogOut />
      Log Out
    </button>
  );
};

export default ButtonLogout;

