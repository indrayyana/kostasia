import { useState } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import ClickOutside from '@/components/ClickOutside';
import { useFetchNotificationsUser } from '@/hooks/useNotification';
import { UserInterface } from '@/types/user';
import dateFormat from '@/utils/dateFormat';
import { Skeleton } from '../ui/skeleton';

const DropdownNotification = ({ user }: { user: UserInterface }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const { data, isPending } = useFetchNotificationsUser(user?.user_id);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <button
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? 'hidden' : 'inline'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <Bell size={20} />
        </button>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">Notifikasi</h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              {isPending ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <li key={index}>
                    <Link
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          <Skeleton className="h-[20px] w-[280px]" />
                        </span>{' '}
                      </p>

                      <p className="text-xs">
                        <Skeleton className="h-[15px] w-[280px]" />
                      </p>
                    </Link>
                  </li>
                ))
              ) : data?.notifications ? (
                data?.notifications.map((message, index) => (
                  <li key={index}>
                    <Link
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          {message?.judul || 'Notifikasi Baru'}
                        </span>{' '}
                        {message?.deskripsi || 'Tidak ada deskripsi.'}
                      </p>

                      <p className="text-xs">
                        {dateFormat(message?.dibuat_pada)}
                      </p>
                    </Link>
                  </li>
                ))
              ) : (
                <p className="px-4.5 py-3 text-sm text-bodydark2">
                  Tidak ada notifikasi.
                </p>
              )}
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;

