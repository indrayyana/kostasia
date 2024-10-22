'use client';

import Navbar from './components/Navbar';

export default function Error() {
  return (
    <div className="py-8 px-4 mx-auto max-w-full lg:py-16 lg:px-6 min-h-screen bg-white dark:bg-slate-800">
      <Navbar />
      <div className="mt-12 mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
          500
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          Internal Server Error.
        </p>
        <p className="text-lg font-light text-gray-700 dark:text-gray-400">
          Maaf, terjadi masalah pada server kami.
        </p>
        <p className="mb-4 text-lg font-light text-gray-700 dark:text-gray-400">
          Silakan coba refresh halaman atau coba lagi nanti.
        </p>
      </div>
    </div>
  );
}

