'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useFetchUsers } from '@/hooks/useUser';

export default function UserPage() {
  const { data, refetch, isPending, isError } = useFetchUsers();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />
      <div className="flex flex-col text-black-2">
        {isError ? (
          <p className="text-red-500 text-center">
            Terjadi kesalahan saat menampilkan data
          </p>
        ) : (
          <DataTable
            columns={columns(refetch)}
            data={data?.user || []}
            isLoading={isPending}
          />
        )}
      </div>
    </DefaultLayout>
  );
}

