'use client';

import {
  HiOutlineSun as SunIcon,
  HiOutlineMoon as MoonIcon,
  HiOutlineRefresh as RefreshIcon,
} from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Theme() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      // loading icon
      <button
        type="button"
        onClick={() => setTheme('light')}
        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <RefreshIcon className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          Tema
        </span>
      </button>
    );

  if (currentTheme === 'dark') {
    return (
      <button
        type="button"
        onClick={() => setTheme('light')}
        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <SunIcon className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          Tema
        </span>
      </button>
    );
  }

  if (currentTheme === 'light') {
    return (
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <MoonIcon className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          Tema
        </span>
      </button>
    );
  }
}

