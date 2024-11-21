'use client';

import * as React from 'react';
import {
  Download,
  FileDown,
  FileSpreadsheet,
  FileText,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TableLoader from '../../../../../components/common/TableLoader';

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

  const selectedRows = table.getSelectedRowModel().rows;

  const handleDelete = () => {
    const selectedIds = selectedRows.map((row) => row.original.user_id);
    alert(`Hapus ID: ${selectedIds}`);
    // TODO: Tambahkan logika untuk menghapus data di sini
  };

  const fileDownload = (format: string) => {
    alert(`Download file ${format} berhasil`);
  };

  return (
    <>
      <div className="flex gap-2 justify-between">
        <div className="w-90 relative">
          <span className="absolute left-2 top-2.5">
            <Search size={20} className="text-gray-500" />
          </span>
          <Input
            placeholder="Cari"
            value={(table.getColumn('nama')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('nama')?.setFilterValue(event.target.value)
            }
            className="pl-8 pr-4.5 dark:text-white"
          />
        </div>
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

      <div className="rounded-md border bg-white mt-5 dark:bg-boxdark dark:text-white dark:border-gray-500">
        <div className="w-full h-9 m-2">
          {selectedRows.length > 0 && (
            <div>
              <Button
                size={'sm'}
                variant="destructive"
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 />
                Hapus
              </Button>
            </div>
          )}
        </div>
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="dark:border-gray-500" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-bold text-black-2 dark:text-white"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoader colSpan={columns.length} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="dark:border-gray-500"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada hasil.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 dark:text-white">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} dari{' '}
          {table.getFilteredRowModel().rows.length} data dipilih.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Selanjutnya
        </Button>
      </div>
    </>
  );
}

