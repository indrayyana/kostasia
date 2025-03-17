'use client';

import { HiMiniSun as SunIcon, HiMiniMoon as MoonIcon } from 'react-icons/hi2';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Theme() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-5 h-8 mx-1"></div>;

  if (currentTheme === 'dark') {
    return (
      <button
        type="button"
        onClick={() => setTheme('light')}
        className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <SunIcon className="w-8 h-8 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
      </button>
    );
  }

  if (currentTheme === 'light') {
    return (
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <MoonIcon className="w-8 h-8 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
      </button>
    );
  }
}

