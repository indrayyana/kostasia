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
          <h2 className="text-4xl text-center text-white font-bold">
            &quot;Halaman sedang dalam perbaikan&quot;
          </h2>
          <h2 className="mt-5 text-4xl text-center text-white font-bold">
            &quot;(Pages are under construction)&quot;
          </h2>
          <div className="mt-5 flex justify-center gap-10">
            <Link
              href="/denpasar"
              type="button"
              className="mt-4 text-white bg-purple-600 font-bold border-2 border-black shadow-solid-sm hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-3 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Denpasar
            </Link>
            <Link
              href="/klungkung"
              type="button"
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

