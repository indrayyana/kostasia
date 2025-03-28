'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Theme from './Theme';
import { config } from '@/utils/config';
import { useAuth } from './AuthProvider';

interface NavbarProps {
  hasBreadcrumb?: boolean;
}

export default function Navbar({ hasBreadcrumb = true }: NavbarProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { name: 'Beranda', href: '/' },
    {
      name: 'Denpasar',
      href: '/denpasar',
      regex: /^\/denpasar(\/kamar\/.*)?$|^\/booking\/denpasar\/.*$/,
    },
    {
      name: 'Klungkung',
      href: '/klungkung',
      regex: /^\/klungkung(\/kamar\/.*)?$|^\/booking\/klungkung\/.*$/,
    },
    { name: 'Kontak Kami', href: '/kontak' },
  ];

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 transition-all duration-300 ${
        scrolled || !hasBreadcrumb ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent dark:bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={config.app.baseURL}
          title="Kost ASIA"
          prefetch={false}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="https://www.kostasia.com/assets/logo.png"
            height={250}
            width={250}
            className="h-8 w-auto"
            alt="Kost ASIA Logo"
          />
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap dark:text-white ${
              scrolled || !hasBreadcrumb ? '' : 'text-white'
            }`}
          >
            Kost ASIA
          </span>
        </Link>
        <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
          <div className="lg:mr-3 flex justify-center items-center">
            <Theme scrolled={scrolled || !hasBreadcrumb} />
          </div>
          {!user ? (
            <Link
              href={'/api/auth/login'}
              title="Tombol Google Login"
              prefetch={false}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </Link>
          ) : (
            <Link
              href={'/dashboard/profil'}
              title="Tombol Profil"
              prefetch={false}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Profil
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className={`inline-flex items-center w-9 h-9 justify-center text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white ${
              scrolled ? '' : 'text-white'
            }`}
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          ref={menuRef}
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isOpen ? 'block' : 'hidden'}`}
          id="navbar-sticky"
        >
          <ul
            className={`flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 dark:border-gray-700 ${
              scrolled ? '' : 'bg-white lg:bg-transparent dark:lg:bg-transparent dark:bg-black-2'
            }`}
          >
            {menuItems.map((item) => {
              const isActive = item.regex?.test(pathname) || pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    title={item.name}
                    className={`block py-1 px-3  ${
                      isActive
                        ? 'text-white max-lg:text-white max-lg:bg-blue-700 lg:text-blue-600 lg:font-bold lg:border-y-2 lg:border-blue-600'
                        : 'text-gray-900 hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-600 lg:dark:hover:bg-transparent dark:border-gray-700'
                    } ${scrolled || !hasBreadcrumb ? '' : 'text-white max-lg:text-gray-900'}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

