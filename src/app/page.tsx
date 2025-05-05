// 'use client';

// import Header from '@/components/ui/header';
// import Footer from '@/components/ui/footer';
// import LocationCard from '@/components/LocationCard';
// import ScrollToTop from '@/components/ScrollToTop';
// import CallToAction from '@/components/CallToAction';
// import { useParallax } from 'react-scroll-parallax';
// import Image from 'next/image';

// export default function Home() {
//   // throw new Error('Controller file error in line 87'); // TODO: testing server error

//   const shojiLeft = useParallax<HTMLDivElement>({
//     translateX: ['-100%', '0%'],
//     easing: 'easeInQuad',
//   });

//   const shojiRight = useParallax<HTMLDivElement>({
//     translateX: ['100%', '0%'],
//     easing: 'easeInQuad',
//   });

//   return (
//     <>
//       <Header />
//       <main className="overflow-x-hidden">
//         <section className="w-full h-screen">
//           {/* <h2 className="text-3xl mt-12 text-center text-white font-bold">Selamat Datang</h2>
//           <p className="mt-5 text-3xl text-center text-white font-bold">Kost ASIA</p>
//           <p className="mt-5 text-xl text-center text-white font-bold">
//             Selamat datang di Kost ASIA, kami menawarkan 16 unit kamar kost yang tersebar di 2 lokasi strategis.
//           </p> */}
//           <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
//             <Image
//               src="/assets/room.webp"
//               alt="Room Interior"
//               width={2400}
//               height={1350}
//               priority={true}
//               className="absolute inset-0 w-full h-full object-cover"
//             />

//             <div ref={shojiRight.ref} className="absolute right-0 h-full w-auto">
//               <Image
//                 src="/assets/shoji-right.webp"
//                 alt="Shoji Right"
//                 width={979}
//                 height={1099}
//                 className="h-full w-auto object-cover"
//               />
//             </div>

//             <div ref={shojiLeft.ref} className="absolute left-0 h-full w-auto">
//               <Image
//                 src="/assets/shoji-left.webp"
//                 alt="Shoji Left"
//                 width={979}
//                 height={1099}
//                 className="h-full w-auto object-cover"
//               />
//             </div>
//           </div>
//         </section>
//         <section className="p-12">
//           <p className="my-4 text-2xl text-center font-bold">Pilih Lokasi Kost</p>
//           <div className="lg:mx-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 sm:gap-8 md:gap-10 lg:gap-12">
//             <LocationCard
//               aosAnimate="fade-right"
//               name="Kost Denpasar"
//               imageUrl="/assets/denpasar.webp"
//               route="/denpasar"
//             />
//             <LocationCard
//               aosAnimate="fade-left"
//               name="Kost Klungkung"
//               imageUrl="/assets/klungkung.webp"
//               route="/klungkung"
//             />
//           </div>
//         </section>
//         <CallToAction />
//         <ScrollToTop />
//       </main>
//       <Footer />
//     </>
//   );
// }

// 'use client';

// import Header from '@/components/ui/header';
// import Footer from '@/components/ui/footer';
// import LocationCard from '@/components/LocationCard';
// import ScrollToTop from '@/components/ScrollToTop';
// import CallToAction from '@/components/CallToAction';
// import { useParallax } from 'react-scroll-parallax';
// import Image from 'next/image';
// import { useRef } from 'react';

// export default function Home() {
//   const shojiLeft = useParallax<HTMLDivElement>({
//     startScroll: -500,
//     endScroll: 500,
//     translateX: ['-100%', '0%'],
//     easing: 'easeInQuad',
//     shouldAlwaysCompleteAnimation: true,
//   });

//   const shojiRight = useParallax<HTMLDivElement>({
//     startScroll: -500,
//     endScroll: 500,
//     translateX: ['100%', '0%'],
//     easing: 'easeInQuad',
//     shouldAlwaysCompleteAnimation: true,
//   });

//   const containerRef = useRef<HTMLDivElement>(null);

//   return (
//     <>
//       <Header />
//       <main className="overflow-x-hidden">
//         <section className="w-full h-screen">
//           <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
//             <Image
//               src="/assets/room.webp"
//               alt="Room Interior"
//               width={2400}
//               height={1350}
//               priority={true}
//               className="absolute inset-0 w-full h-full object-cover"
//             />

//             <div
//               ref={shojiRight.ref}
//               className="absolute right-0 h-full w-auto"
//               style={{ transform: 'translateX(100%)' }}
//             >
//               <Image
//                 src="/assets/shoji-right.webp"
//                 alt="Shoji Right"
//                 width={979}
//                 height={1099}
//                 className="h-full w-auto object-cover"
//               />
//             </div>

//             <div
//               ref={shojiLeft.ref}
//               className="absolute left-0 h-full w-auto"
//               style={{ transform: 'translateX(-100%)' }}
//             >
//               <Image
//                 src="/assets/shoji-left.webp"
//                 alt="Shoji Left"
//                 width={979}
//                 height={1099}
//                 className="h-full w-auto object-cover"
//               />
//             </div>
//           </div>
//         </section>
//         <section className="p-12">
//           <p className="my-4 text-2xl text-center font-bold">Pilih Lokasi Kost</p>
//           <div className="lg:mx-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 sm:gap-8 md:gap-10 lg:gap-12">
//             <LocationCard
//               aosAnimate="fade-right"
//               name="Kost Denpasar"
//               imageUrl="/assets/denpasar.webp"
//               route="/denpasar"
//             />
//             <LocationCard
//               aosAnimate="fade-left"
//               name="Kost Klungkung"
//               imageUrl="/assets/klungkung.webp"
//               route="/klungkung"
//             />
//           </div>
//         </section>
//         <CallToAction />
//         <ScrollToTop />
//       </main>
//       <Footer />
//     </>
//   );
// }

'use client';

import { useParallax } from 'react-scroll-parallax';
import Image from 'next/image';
import { useRef, useEffect, useState, Suspense, useMemo, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import LocationCard from '@/components/LocationCard';
import ScrollToTop from '@/components/ScrollToTop';
import CallToAction from '@/components/CallToAction';

function HomeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isLogin = searchParams.get('is_login');

  const handleSwal = useCallback(() => {
    Swal.fire({
      title: 'Login Diperlukan',
      text: 'Silahkan login terlebih dahulu untuk melanjutkan',
      icon: 'warning',
      theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      customClass: {
        popup: 'w-96 max-w-lg',
        title: 'text-lg font-semibold',
        actions: 'flex justify-around',
        confirmButton: 'text-sm px-4 py-2 bg-primary',
        cancelButton: 'text-sm px-4 py-2 bg-danger',
      },
    }).then(() => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('is_login');
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    });
  }, [searchParams, pathname, router]);

  useEffect(() => {
    if (isLogin === 'false') handleSwal();
  }, [isLogin, handleSwal]);

  const getOffset = useMemo(() => (windowWidth < 480 ? 630 : 800), [windowWidth]);

  const shojiLeft = useParallax<HTMLDivElement>(
    useMemo(
      () => ({
        startScroll: -getOffset,
        endScroll: getOffset,
        translateX: ['-100%', '0%'],
        easing: 'easeInQuad',
        shouldAlwaysCompleteAnimation: true,
      }),
      [getOffset]
    )
  );

  const shojiRight = useParallax<HTMLDivElement>(
    useMemo(
      () => ({
        startScroll: -getOffset,
        endScroll: getOffset,
        translateX: ['100%', '0%'],
        easing: 'easeInQuad',
        shouldAlwaysCompleteAnimation: true,
      }),
      [getOffset]
    )
  );

  useEffect(() => {
    // setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <main className="overflow-x-hidden">
        <section className="w-full min-h-screen">
          <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <Image
              src="/assets/room.webp"
              alt="Room Interior"
              fill={true}
              priority={true}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-black px-5 pt-3 rounded-t-3xl">
                <p className="bg-gradient-to-r from-blue-600 to-cyan-300 bg-clip-text text-transparent text-3xl md:text-7xl font-medium bg-red rounded-lg text-center">
                  Kost ASIA
                </p>
              </div>
              <div className="bg-black px-5 pt-1 pb-3 rounded-3xl">
                <p className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent text-3xl md:text-5xl font-semibold text-whitepx-4 p-2 bg-black rounded-lg text-center">
                  Selamat Datang
                </p>
              </div>
            </div>

            <div
              ref={shojiRight.ref}
              className="absolute right-0 h-full"
              style={{
                width: `${Math.min(979, windowWidth * 0.6)}px`,
              }}
            >
              <Image
                src="/assets/shoji-right.webp"
                alt="Shoji Right"
                fill={true}
                priority={true}
                className="h-full w-full object-cover object-left"
              />
            </div>

            <div
              ref={shojiLeft.ref}
              className="absolute left-0 h-full"
              style={{
                width: `${Math.min(979, windowWidth * 0.6)}px`,
              }}
            >
              <Image
                src="/assets/shoji-left.webp"
                alt="Shoji Left"
                fill={true}
                priority={true}
                className="h-full w-full object-cover object-right"
              />
            </div>
          </div>
        </section>
        <section className="min-h-screen p-10 md:px-12">
          <p className="mt-10 mb-5 text-xl sm:text-4xl text-center font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
            Kost ASIA
          </p>
          <p className="text-center font-semibold text-2xl mb-15 text-black dark:text-white">
            Kenapa harus Kost ASIA ?
          </p>

          <div className="mx-4 sm:mx-8 lg:mx-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {[
              {
                icon: '/assets/location.svg',
                title: 'Lokasi Strategis',
                desc: 'Dekat dengan fasilitas umum seperti sekolah, kampus, rumah sakit, dll.',
              },
              {
                icon: '/assets/savings.svg',
                title: 'Harga Terjangkau',
                desc: 'Harga sewa yang kompetitif dengan berbagai pilihan fasilitas.',
              },
              {
                icon: '/assets/calendar.svg',
                title: 'Sewa Fleksibel',
                desc: 'Tersedia sewa harian, mingguan, atau bulanan.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                data-aos="zoom-in"
                className="flex flex-col items-center text-center p-4 shadow-md rounded-lg"
              >
                <Image src={item.icon} width={200} height={200} alt={item.title} className="w-40 h-40 mb-4" />
                <p className="text-lg font-semibold text-black dark:text-white">{item.title}</p>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="min-h-screen p-4 sm:p-8 md:p-12 bg-gray-200 dark:bg-gray-900">
          <p className="mt-4 mb-10 text-xl sm:text-4xl text-center font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
            Pilih Lokasi Kost
          </p>
          <div className="mx-4 mb-5 sm:mx-8 lg:mx-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <LocationCard
              aosAnimate="fade-right"
              name="Kost Denpasar"
              imageUrl="/assets/denpasar.webp"
              route="/denpasar"
            />
            <LocationCard
              aosAnimate="fade-left"
              name="Kost Klungkung"
              imageUrl="/assets/klungkung.webp"
              route="/klungkung"
            />
          </div>
        </section>
        <CallToAction />
        <ScrollToTop />
      </main>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <Suspense>
        <HomeContent />
      </Suspense>
      <Footer />
    </>
  );
}

