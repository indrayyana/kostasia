'use client';

import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useFetchNotifications } from '@/hooks/useNotification';

export default function NotifikasiPage() {
  const { data, refetch, isPending, isError } = useFetchNotifications();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notifikasi" />
      <div className="flex flex-col text-black-2">
        {isError ? (
          <p className="text-red-500 text-center">
            Terjadi kesalahan saat menampilkan data
          </p>
        ) : (
          <DataTable
            columns={columns(refetch)}
            data={data?.notifications || []}
            isLoading={isPending}
            refetch={refetch}
          />
        )}
      </div>
    </DefaultLayout>
  );
}

