import { IconBrandWhatsapp, IconMail } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex grid grid-cols-2 gap-4 md:justify-around sm:gap-80">
          <div className="mb-6 md:mb-0">
            <a href="https://www.kostasia.com" className="flex items-center">
              <Image
                src="https://www.kostasia.com/assets/logo.png"
                width={250}
                height={250}
                className="mr-3 h-8 w-auto"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Kost ASIA
              </span>
            </a>
            <div className="mt-3 flex flex-col gap-4">
              <Link
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:underline dark:hover:text-white"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:underline dark:hover:text-white"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Hubungi Kami
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <Link
                  href={
                    'https://wa.me/6287762642945?text=Halo Bu, saya mau pesan kamar kost an'
                  }
                  target="_blank"
                  className="hover:underline"
                >
                  <div className="flex gap-2">
                    <IconBrandWhatsapp />
                    087762642945
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:no.reply.kost.asia@gmail.com"
                  className="hover:underline"
                >
                  <div className="flex gap-2">
                    <IconMail />
                    info@gmail.com
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear} Kost ASIA. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

