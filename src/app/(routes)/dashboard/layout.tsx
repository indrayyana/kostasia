import type { Metadata } from 'next';
import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import '@/css/style.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster position="top-center" />
      <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
    </>
  );
}

