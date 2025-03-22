import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col px-6 justify-center items-center mx-auto max-w-full min-h-screen bg-gray-100 dark:bg-slate-800">
        <Navbar hasBreadcrumb={false} />
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
            404
          </p>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Halaman Tidak Ditemukan.
          </p>
          <p className="mb-4 text-lg font-light text-gray-700 dark:text-gray-400">
            Kami tidak dapat menemukan halaman yang Anda cari.
          </p>
          <Link
            href="/"
            title="Tombol kembali ke beranda"
            className="bg-blue-700 p-4 inline-flex text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
}

