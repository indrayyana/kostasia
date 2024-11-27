'use client';

import useSWR from 'swr';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { fetcher } from '@/utils/fetcher';

export default function UserPage() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    fetcher
  );

  const users = data?.user || [];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />
      <div className="flex flex-col text-black-2">
        {error ? (
          <p className="text-red-500 text-center">
            Terjadi kesalahan saat menampilkan data: {error.message}
          </p>
        ) : (
          <DataTable columns={columns} data={users} isLoading={isLoading} />
        )}
      </div>
    </DefaultLayout>
  );
}

