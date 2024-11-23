'use client';

// import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import '@/css/style.css';

// TODO: check modal
// export const metadata: Metadata = {
//   robots: {
//     index: false,
//     follow: false,
//     googleBot: {
//       index: false,
//       follow: false,
//     },
//   },
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
      </SessionProvider>
    </>
  );
}

