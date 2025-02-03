'use client';

import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { DataTable } from './data-table';
import { columns } from './columns';
import useNotif from '@/hooks/useNotif';

export default function NotifikasiPage() {
  const { notif, loading, error, addNotif, deleteNotif } = useNotif();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notifikasi" />
      <div className="flex flex-col text-black-2">
        {error ? (
          <p className="text-red-500 text-center">
            Terjadi kesalahan saat menampilkan data: {error}
          </p>
        ) : (
          <DataTable
            columns={columns(deleteNotif)}
            data={notif}
            isLoading={loading}
            onAddNotif={addNotif}
          />
        )}
      </div>
    </DefaultLayout>
  );
}

