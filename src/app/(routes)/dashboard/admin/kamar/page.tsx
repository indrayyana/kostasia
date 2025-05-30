'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useFetchRooms } from '@/hooks/useRoom';

export default function KamarPage() {
  const { data, refetch, isPending, isError } = useFetchRooms();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Kamar" />
      <div className="flex flex-col text-black-2">
        {isError ? (
          <p className="text-red-500 text-center my-20">Terjadi kesalahan saat menampilkan data</p>
        ) : (
          <DataTable columns={columns(refetch)} data={data?.kamar || []} isLoading={isPending} refetch={refetch} />
        )}
      </div>
    </DefaultLayout>
  );
}

