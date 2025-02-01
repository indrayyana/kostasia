'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { deleteToken } from '@/utils/cookies';
import api from '@/lib/axios';
import { config } from '@/utils/config';

const ButtonLogout = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      onClick={() => {
        Swal.fire({
          title: 'Apakah Anda yakin ingin logout ?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Batal',
          confirmButtonText: 'Logout',
          customClass: {
            popup: 'w-96 max-w-lg',
            title: 'text-lg font-semibold',
            actions: 'flex justify-around',
            confirmButton: 'text-sm px-4 py-2 bg-primary',
            cancelButton: 'text-sm px-4 py-2 bg-danger',
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await api.post(`${config.app.apiURL}/auth/logout`);
            if (res.status === 200) {
              deleteToken();
              router.push('/');
            }
          }
        });
      }}
    >
      <LogOut />
      Log Out
    </button>
  );
};

export default ButtonLogout;

