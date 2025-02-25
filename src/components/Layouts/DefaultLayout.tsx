'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useFetchUserProfile } from '@/hooks/useUser';
import Loader from '../common/Loader';
import DropdownUser from '../Header/DropdownUser';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useFetchUserProfile();
  const user = data?.user;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-h-screen">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col lg:ml-72.5">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
              <DropdownUser user={user} />
            </Header>
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 dark:bg-boxdark-2">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      )}
    </>
  );
}

