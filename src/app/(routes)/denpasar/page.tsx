import Image from 'next/image';
import Rooms from '@/components/Rooms';
import GoogleMaps from '@/components/GoogleMaps';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import ScrollToTop from '@/components/ScrollToTop';
import CallToAction from '@/components/CallToAction';

export default function Denpasar() {
  return (
    <>
      <Header title="Kost Denpasar" />
      <main>
        <section className="w-full p-12 bg-blue-600">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="">
              <Image
                src={'/assets/room-detail.webp'}
                loading="lazy"
                width={1000}
                height={1000}
                alt="Gambar kost"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <div className="text-white flex flex-col gap-5">
              <h2 className="text-4xl font-bold">Tentang Kami</h2>
              <p className="text-justify">
                Kami menawarkan pilihan fleksibel bagi para penghuni dengan penyewaan harian, mingguan, dan bulanan,
                sesuai kebutuhan Anda. Tersedia 10 kamar yang dirancang untuk kenyamanan maksimal, masing-masing
                dilengkapi dengan kamar mandi dalam untuk privasi dan kemudahan Anda. Nikmati pengalaman tinggal yang
                menyenangkan dan praktis bersama kami!
              </p>
              <p>Fasilitas:</p>
              <ul className="list-disc">
                <li>Kamar mandi dalam</li>
                <li>Lemari</li>
                <li>Kasur</li>
              </ul>
            </div>
          </div>
        </section>

        <Rooms cabang="denpasar" />
        <GoogleMaps cabang="denpasar" />
        <CallToAction />
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}
