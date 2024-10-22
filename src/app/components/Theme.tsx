'use client';

import {
  HiOutlineSun as SunIcon,
  HiOutlineMoon as MoonIcon,
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
      <div>
        .<span className="sr-only">.</span>
      </div>
    );

  if (currentTheme === 'dark') {
    return (
      <SunIcon
        className="h-full w-full text-neutral-500 dark:text-neutral-300"
        onClick={() => setTheme('light')}
      />
    );
  }

  if (currentTheme === 'light') {
    return (
      <MoonIcon
        className="h-full w-full text-neutral-500 dark:text-neutral-300"
        onClick={() => setTheme('dark')}
      />
    );
  }
}

