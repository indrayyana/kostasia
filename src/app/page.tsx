import Link from 'next/link';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

export default function Home() {
  // throw new Error('Controller file error in line 87'); // TODO: testing server error
  return (
    <>
      <Header />
      <main>
        <section
          id="tentang"
          className="w-full p-12 mt-12 flex flex-col bg-blue-600 border-4 border-black"
        >
          <h2 className="text-3xl text-center text-white font-bold">
            Selamat Datang
          </h2>
          <h3 className="mt-5 text-3xl text-center text-white font-bold">
            Kost ASIA
          </h3>
          <p className="mt-5 text-xl text-center text-white font-bold">
            Selamat datang di Kost ASIA, kami menawarkan 16 unit kamar kost yang
            tersebar di 2 lokasi strategis.
          </p>
          <p className="mt-5 text-xl text-center text-white font-bold">
            Pilih Lokasi Kost anda:
          </p>
          <div className="mt-5 flex justify-center gap-10">
            <Link
              href="/denpasar"
              type="button"
              title="Kost ASIA cabang Denpasar"
              className="mt-4 text-white bg-purple-600 font-bold border-2 border-black shadow-solid-sm hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-3 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Denpasar
            </Link>
            <Link
              href="/klungkung"
              type="button"
              title="Kost ASIA cabang Klungkung"
              className="mt-4 text-white bg-purple-600 font-bold border-2 border-black shadow-solid-sm hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-3 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Klungkung
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

