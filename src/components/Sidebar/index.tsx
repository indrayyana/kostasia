'use client';

import React from 'react';
import {
  ArrowLeft,
  Bell,
  CreditCard,
  DoorOpen,
  LayoutDashboard,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SidebarItem from '@/components/Sidebar/SidebarItem';
import ClickOutside from '@/components/ClickOutside';
import useLocalStorage from '@/hooks/useLocalStorage';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: 'MENU',
    menuItems: [
      {
        icon: <LayoutDashboard size={20} />,
        label: 'Dashboard',
        route: '/dashboard/admin',
      },
      {
        icon: <DoorOpen size={20} />,
        label: 'Kamar',
        route: '/dashboard/admin/kamar',
      },
      {
        icon: <Users size={20} />,
        label: 'User',
        route: '/dashboard/admin/user',
      },
      {
        icon: <CreditCard size={20} />,
        label: 'Pembayaran',
        route: '#',
      },
      {
        icon: <Bell size={20} />,
        label: 'Notifikasi',
        route: '/dashboard/admin/notifikasi',
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage('selectedMenu', 'dashboard');

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
            <h1 className="text-white font-semibold text-3xl">KostASIA</h1>
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
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;

