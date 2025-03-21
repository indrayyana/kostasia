'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ClickOutside from '@/components/ClickOutside';
import { Skeleton } from '../ui/skeleton';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SidebarLoading = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href={'/'} className="flex gap-2">
            <Image
              className="rounded-lg"
              width={32}
              height={32}
              src={'/assets/logo.png'}
              alt="Logo"
              title="Gambar Logo"
              priority
            />
            <p className="text-white font-semibold text-3xl">KostASIA</p>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <ArrowLeft size={30} />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            <div>
              <p className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                MENU
              </p>

              <ul className="mb-6 flex flex-col gap-1.5">
                {Array.from({ length: 4 }).map((_, menuIndex) => (
                  <Skeleton
                    key={menuIndex}
                    className="mb-2 h-[35px] w-[242px]"
                  />
                ))}
              </ul>
            </div>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default SidebarLoading;

