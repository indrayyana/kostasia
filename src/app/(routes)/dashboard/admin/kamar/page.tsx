'use client';

import useSWR from 'swr';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { DataTable } from './data-table';
import { columns } from './columns';
import { fetcher } from '@/utils/fetcher';

export default function KamarPage() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms`,
    fetcher
  );

  const rooms = data?.kamar || [];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Kamar" />
      <div className="flex flex-col text-black-2">
        {error ? (
          <p className="text-red-500">Error fetching data: {error.message}</p>
        ) : (
          <DataTable columns={columns} data={rooms} isLoading={isLoading} />
        )}
      </div>
    </DefaultLayout>
  );
}

