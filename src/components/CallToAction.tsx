import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-l from-blue-500 via-blue-700 to-blue-900">
      <div data-aos="zoom-in" className="px-12 py-20 flex flex-col gap-7 justify-center items-center text-white">
        <p className="text-3xl text-center font-bold">Yuk Jangan Sampai Kehabisan</p>
        <p className="max-xsm:text-center max-xsm:mb-4">Amankan kamar pilihanmu sekarang</p>
        <Link
          href="https://wa.me/6287762642945?text=Halo Bu, saya mau pesan kamar kost an"
          className="neon relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-white border-2 border-white hover:border-primary rounded-full hover:text-primary group hover:bg-primary"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-white opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="relative">Pesan Sekarang</span>
        </Link>
      </div>
    </section>
  );
}

