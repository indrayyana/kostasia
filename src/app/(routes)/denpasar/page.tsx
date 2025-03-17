import Link from 'next/link';
import Rooms from '@/components/Rooms';

export default function Denpasar() {
  return (
    <>
      <main>
        <section
          id="tentang"
          className="w-full p-12 mt-12 flex flex-col bg-blue-600 border-4 border-black"
        >
          <h2 className="text-4xl text-center text-white font-bold">
            Tentang Kami
          </h2>
          <p className="max-w-md text-justify mx-auto m-6 text-white">
            Kami menawarkan pilihan fleksibel bagi para penghuni dengan
            penyewaan harian, mingguan, dan bulanan, sesuai kebutuhan Anda.
            Tersedia 10 kamar yang dirancang untuk kenyamanan maksimal,
            masing-masing dilengkapi dengan kamar mandi dalam untuk privasi dan
            kemudahan Anda. Nikmati pengalaman tinggal yang menyenangkan dan
            praktis bersama kami!
          </p>
          <Link
            href={
              'https://wa.me/6287762642945?text=Halo Bu, saya mau pesan kamar kost an'
            }
            type="button"
            title="Booking kamar via Whatsapp"
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
          <h2 className="text-2xl font-bold my-4">Lokasi Kami</h2>
          <div
            className="relative w-full h-0 text-center p-4 border-4 border-black shadow-solid"
            style={{ height: '30rem' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d414.5780842981088!2d115.22449069076654!3d-8.676933605853485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2418a8adfd849%3A0x105878587377e5db!2sKost%20ASIA!5e0!3m2!1sid!2sid!4v1732361369485!5m2!1sid!2sid"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kost ASIA Denpasar"
            ></iframe>
          </div>
        </section>
      </main>
    </>
  );
}
