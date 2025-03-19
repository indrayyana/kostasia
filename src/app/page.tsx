import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import LocationCard from '@/components/LocationCard';
import ScrollToTop from '@/components/ScrollToTop';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  // throw new Error('Controller file error in line 87'); // TODO: testing server error
  return (
    <>
      <Header />
      <main>
        <section
          id="tentang"
          className="w-full p-12 flex flex-col bg-blue-600 border-4 border-black"
        >
          <h2 className="text-3xl mt-12 text-center text-white font-bold">
            Selamat Datang
          </h2>
          <h3 className="mt-5 text-3xl text-center text-white font-bold">
            Kost ASIA
          </h3>
          <p className="mt-5 text-xl text-center text-white font-bold">
            Selamat datang di Kost ASIA, kami menawarkan 16 unit kamar kost yang
            tersebar di 2 lokasi strategis.
          </p>
        </section>
        <section className="p-12">
          <p className="my-4 text-2xl text-center font-bold">
            Pilih Lokasi Kost
          </p>
          <div className="lg:mx-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 sm:gap-8 md:gap-10 lg:gap-12">
            <LocationCard
              name="Kost Denpasar"
              imageUrl="/assets/denpasar.webp"
              route="/denpasar"
            />
            <LocationCard
              name="Kost Klungkung"
              imageUrl="/assets/klungkung.webp"
              route="/klungkung"
            />
          </div>
        </section>
        <CallToAction />
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}

