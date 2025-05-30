'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/footer';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="flex flex-col px-6 justify-center items-center mx-auto max-w-full min-h-screen bg-gray-100 dark:bg-slate-800">
        <Navbar hasBreadcrumb={false} />
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
            500
          </p>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Internal Server Error.
          </p>
          <p className="text-lg font-light text-gray-700 dark:text-gray-400">
            Maaf, terjadi masalah pada server kami.
          </p>
          <p className="mb-4 text-lg font-light text-gray-700 dark:text-gray-400">
            Silakan coba refresh halaman atau coba lagi nanti.
          </p>
          <Button
            onClick={() => reset()}
            title="Tombol refresh halaman"
            className="bg-blue-700 inline-flex text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-5 text-center dark:focus:ring-blue-900 my-4"
          >
            Refresh Halaman
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

