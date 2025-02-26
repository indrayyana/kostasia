import React, { memo, useState } from 'react';
import { ChevronDown, CreditCard, DoorOpen, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ClickOutside from '@/components/ClickOutside';
import ButtonLogout from './ButtonLogout';
import { UserInterface } from '@/types/user';

interface DropdownUserProps {
  user: UserInterface;
}

const DropdownUser: React.FC<DropdownUserProps> = memo(({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.nama}
          </span>
          <span className="block text-xs capitalize text-[#64748B]">
            {user?.role}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            className="rounded-full"
            width={112}
            height={112}
            src={user?.foto}
            style={{
              width: 'auto',
              height: 'auto',
            }}
            alt="User"
            title="Foto Profil"
            priority
          />
        </span>

        <ChevronDown size={20} />
      </button>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                href="/dashboard/profil"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <User />
                Profil
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <DoorOpen />
                Kamar Saya
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <CreditCard />
                Pembayaran
              </Link>
            </li>
          </ul>
          <ButtonLogout />
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
});

DropdownUser.displayName = 'DropdownUser';

export default DropdownUser;

