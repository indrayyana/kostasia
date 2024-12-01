'use client';

import useSWR from 'swr';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import UserSidebar from '@/components/Sidebar/User';
import Header from '@/components/Header';
import { fetcher } from '@/utils/fetcher';
import { config } from '@/utils/config';
import Loader from '../common/Loader';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useSWR(
    `${config.app.apiURL}/users/profile`,
    fetcher
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = data?.user || {};

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-h-screen">
          {/* <!-- ===== Sidebar Start ===== --> */}
          {user.role === 'admin' ? (
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          ) : (
            <UserSidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          )}

          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col lg:ml-72.5">
            {/* <!-- ===== Header Start ===== --> */}
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              user={user}
            />
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

      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}

