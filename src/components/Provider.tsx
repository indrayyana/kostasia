'use client';

import { ThemeProvider } from 'next-themes';
import { ParallaxProvider } from 'react-scroll-parallax';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './AuthProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ParallaxProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </ParallaxProvider>
    </QueryClientProvider>
  );
}

