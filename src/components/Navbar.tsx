'use client';

import Link from 'next/link';
import useSWR from 'swr';
import {
  IconHome,
  IconBrandWhatsapp,
  IconUser,
  IconLogin,
} from '@tabler/icons-react';
import { HiOutlineRefresh as RefreshIcon } from 'react-icons/hi';
import Theme from './Theme';
import { config } from '../utils/config';
import { fetcher } from '../utils/fetcher';

export default function Navbar() {
  const { data, isLoading } = useSWR(
    `${config.app.apiURL}/users/profile`,
    fetcher
  );

  const user = data?.user || {};

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <Link
          href={'/'}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <IconHome className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Beranda
          </span>
        </Link>
        <Link
          href={'#kontak'}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <IconBrandWhatsapp className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Kontak
          </span>
        </Link>
        <Theme />
        {isLoading ? (
          <Link
            href="/api/auth/login"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <RefreshIcon className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Login
            </span>
          </Link>
        ) : user.nama ? (
          <Link
            href="/dashboard/profil"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <IconUser className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Profil
            </span>
          </Link>
        ) : (
          <Link
            href="/api/auth/login"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <IconLogin className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Login
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}

