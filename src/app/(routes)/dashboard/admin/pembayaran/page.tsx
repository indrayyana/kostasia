'use client';

import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { DataTable } from './data-table';
import { columns } from './columns';

export default function PembayaranPage() {
  const isError = false;
  const data = [
    {
      id: '313693b5-86f2-44d3-b6ce-00dbd57d97cb',
      total: '500000',
      status: 'pending',
      user: {
        nama: 'Test',
      },
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pembayaran" />
      <div className="flex flex-col text-black-2">
        {isError ? (
          <p className="text-red-500 text-center">
            Terjadi kesalahan saat menampilkan data
          </p>
        ) : (
          <DataTable
            columns={columns(() => {
              console.log('coming soon');
            })}
            // data={data?.notifications || []}
            data={data}
            isLoading={false}
            refetch={() => {
              console.log('coming soon');
            }}
          />
        )}
      </div>
    </DefaultLayout>
  );
}

