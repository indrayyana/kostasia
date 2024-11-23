'use client';

import * as React from 'react';
import {
  Download,
  FileDown,
  FileSpreadsheet,
  FileText,
  Plus,
} from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TableSearch from '@/components/ui/table-search';
import MyTable from '@/components/ui/my-table';

interface DataTableProps<TData extends { user_id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function DataTable<TData extends { user_id: string | number }, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  const fileDownload = (format: string) => {
    alert(`Download file ${format} berhasil`);
  };

  return (
    <>
      <div className="flex gap-2 justify-between">
        <TableSearch table={table} columnName="nama" />

        <div className="flex items-center dark:text-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'} className="font-bold mr-2">
                <Download />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Format</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => fileDownload('pdf')}>
                <FileText className="mr-2 h-4 w-4" />
                File .pdf
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileDownload('xlsx')}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                File .xlsx
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileDownload('csv')}>
                <FileDown className="mr-2 h-4 w-4" />
                File .csv
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size={'sm'} className="dark:text-white font-bold">
            <Plus />
            Tambah
          </Button>
        </div>
      </div>

      <MyTable table={table} columns={columns} isLoading={isLoading} />
    </>
  );
}

