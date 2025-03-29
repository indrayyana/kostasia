'use client';

import { HiMiniSun as SunIcon, HiMiniMoon as MoonIcon } from 'react-icons/hi2';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Theme({ scrolled }: { scrolled: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-5 h-8 mx-1"></div>;

  if (currentTheme === 'dark') {
    return (
      <button
        type="button"
        title="Light Mode"
        onClick={() => setTheme('light')}
        className="inline-flex flex-col items-center justify-center group"
      >
        <SunIcon
          className={`w-8 h-8 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 ${
            !scrolled && 'dark:text-white'
          }`}
        />
      </button>
    );
  }

  if (currentTheme === 'light') {
    return (
      <button
        type="button"
        title="Dark Mode"
        onClick={() => setTheme('dark')}
        className="inline-flex flex-col items-center justify-center group"
      >
        <MoonIcon
          className={`w-8 h-8 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 ${
            !scrolled && 'text-white'
          }`}
        />
      </button>
    );
  }
}

