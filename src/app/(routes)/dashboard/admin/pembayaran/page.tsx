"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useFetchTransactions } from "@/hooks/useTransaction";

export default function PembayaranPage() {
  const { data, refetch, isPending, isError } = useFetchTransactions();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pembayaran" />
      <div className="flex flex-col text-black-2">
        {isError ? (
          <p className="text-red-500 text-center">Terjadi kesalahan saat menampilkan data</p>
        ) : (
          <DataTable
            columns={columns(refetch)}
            data={data?.transactions || []}
            isLoading={isPending}
            refetch={refetch}
          />
        )}
      </div>
    </DefaultLayout>
  );
}
