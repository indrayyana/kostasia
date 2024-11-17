import type { Metadata } from 'next';
import Rooms from '@/components/Rooms';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kost ASIA - Denpasar',
  description:
    'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Denpasar dengan harga terjangkau',
  keywords:
    'kost asia, kos, kost, info kost, rumah kost, sewa kost, kost terdekat, kost murah, cari kost, denpasar, asia, harian, mingguan, bulanan',
  openGraph: {
    title: 'Kost ASIA - Denpasar',
    description:
      'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Denpasar dengan harga terjangkau',
  },
};

export default function Denpasar() {
  return (
    <>
      <section
        id="tentang"
        className="w-full p-12 mt-12 flex flex-col bg-blue-600 border-4 border-black"
      >
        <h2 className="text-4xl text-center text-white font-bold">
          Tentang Kami
        </h2>
        <p className="max-w-md text-justify mx-auto m-6 text-white">
          Kami menawarkan pilihan fleksibel bagi para penghuni dengan penyewaan
          harian, mingguan, dan bulanan, sesuai kebutuhan Anda. Tersedia 10
          kamar yang dirancang untuk kenyamanan maksimal, masing-masing
          dilengkapi dengan kamar mandi dalam untuk privasi dan kemudahan Anda.
          Nikmati pengalaman tinggal yang menyenangkan dan praktis bersama kami!
        </p>
        <Link
          href={
            'https://wa.me/6287762642945?text=Halo Bu, saya mau pesan kamar kost an'
          }
          type="button"
          className="mt-4 max-w-md mx-auto text-white bg-purple-600 font-bold border-2 border-black shadow-solid-sm hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-3 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
        >
          Pesan Sekarang
        </Link>
      </section>
      <section id="kamar" className="flex flex-col p-12">
        <h2 className="text-2xl font-bold my-4">Kamar</h2>
        <Rooms endpoint="denpasar" />
      </section>
      <section id="kontak" className="p-12 bg-blue-600">
        <h2 className="text-2xl font-bold my-4">Kontak Kami</h2>
        <div
          className="relative w-full h-0 text-center p-4 border-4 border-black shadow-solid"
          style={{ height: '30rem' }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d246.5096149227652!2d115.22443394488911!3d-8.676916643885853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1731801568546!5m2!1sid!2sid"
            className="absolute top-0 left-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location of Kost ASIA"
          ></iframe>
        </div>
      </section>
    </>
  );
}

