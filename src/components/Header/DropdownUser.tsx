import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { ChevronDown, CreditCard, DoorOpen, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ClickOutside from '@/components/ClickOutside';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Thomas Anree
          </span>
          <span className="block text-xs">UX Designer</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={'/images/user/user-01.png'}
            style={{
              width: 'auto',
              height: 'auto',
            }}
            alt="User"
          />
        </span>

        <ChevronDown size={20} />
      </Link>

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
          <button
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            onClick={() => {
              signOut();
            }}
          >
            <LogOut />
            Log Out
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;

