import Image from 'next/image';
import Link from 'next/link';
import { IconBrandWhatsapp, IconMail } from '@tabler/icons-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-12 bg-white dark:bg-gray-900 min-h-65">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-12">
          <div>
            <Link href="https://www.kostasia.com" className="flex items-center">
              <Image
                src="https://www.kostasia.com/assets/logo.png"
                width={250}
                height={250}
                className="h-8 w-auto"
                alt="Kost ASIA Logo"
                priority={true}
              />
              <span className="ml-2 text-2xl font-semibold dark:text-white">Kost ASIA</span>
            </Link>
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/kebijakan-privasi" className="text-gray-500 dark:text-gray-400 hover:underline">
                Kebijakan Privasi
              </Link>
              <Link href="/syarat-dan-ketentuan" className="text-gray-500 dark:text-gray-400 hover:underline">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">Hubungi Kami</p>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-3 flex items-center gap-2">
                <IconBrandWhatsapp size={20} />
                <Link
                  href="https://wa.me/6287762642945?text=Halo Bu, saya mau pesan kamar kost an"
                  target="_blank"
                  className="hover:underline"
                >
                  087762642945
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <IconMail size={20} />
                <Link href="mailto:info@kostasia.com" className="hover:underline">
                  info@kostasia.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <div className="text-center text-gray-500 dark:text-gray-400">
          © {currentYear} Kost ASIA. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

