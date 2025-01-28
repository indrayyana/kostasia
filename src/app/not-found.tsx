import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <div className="py-8 px-4 mx-auto max-w-full lg:py-16 lg:px-6 min-h-screen bg-white dark:bg-slate-800">
      <Navbar />
      <div className="mt-12 mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          Halaman Tidak Ditemukan.
        </p>
        <p className="mb-4 text-lg font-light text-gray-700 dark:text-gray-400">
          Kami tidak dapat menemukan halaman yang Anda cari.
        </p>
        <Link
          href="/"
          title="Tombol kembali ke beranda"
          className="bg-blue-500 p-4 border-4 border-black shadow-solid-sm inline-flex text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

