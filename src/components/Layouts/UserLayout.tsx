'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import UserSidebar from '@/components/Sidebar/User';
import Header from '@/components/Header';
import useFCM from '@/hooks/useFCM';
import api from '@/lib/axios';
import { ErrorInterface } from '@/types/error';
import SidebarLoading from '../Sidebar/loading';
import { useAuth } from '../AuthProvider';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, isPending } = useAuth();

  const { fcmToken } = useFCM();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saveToken = async () => {
      if (!user || !fcmToken) return;

      try {
        const res = await api.get(`/notifications/token/${user.user_id}`);
        const currentToken = res.data?.token;

        if (!currentToken || currentToken !== fcmToken) {
          await api.post('/notifications/token', {
            token: fcmToken,
            user_id: user.user_id,
          });
        }
      } catch (error) {
        const err = error as ErrorInterface;
        if (err.response?.status === 404) {
          await api.post('/notifications/token', {
            token: fcmToken,
            user_id: user.user_id,
          });
        } else {
          console.error('Failed to save FCM token: ', error);
        }
      }
    };

    saveToken();
  }, [user, fcmToken]);

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex min-h-screen">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {isPending ? (
          <SidebarLoading sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        ) : user?.role === 'admin' ? (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        ) : (
          <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Header>
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 dark:bg-boxdark-2">{children}</div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>

      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}

