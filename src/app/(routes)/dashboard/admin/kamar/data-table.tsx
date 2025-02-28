'use client';

import * as React from 'react';
import { Plus, Trash2 } from 'lucide-react';
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
import TableLoader from '@/components/common/TableLoader';
import TableSearch from '@/components/ui/table-search';
import TablePagination from '@/components/ui/table-pagination';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DataTableProps<TData extends { kamar_id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function DataTable<TData extends { kamar_id: string | number }, TValue>({
  columns,
  data = [],
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;

  const handleOpenDialog = () => {
    const ids = selectedRows.map((row) => row.original.kamar_id);
    setIsOpen(true);
    console.log(ids);

    // TODO: Tambahkan logika untuk menghapus data di sini
  };

  const handleDelete = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex gap-2 justify-between">
        <TableSearch table={table} />

        <Button size={'sm'} className="dark:text-white font-bold">
          <Plus />
          Tambah
        </Button>
      </div>

      <div className="rounded-md border bg-white mt-5 dark:bg-boxdark dark:text-white dark:border-gray-500">
        <div className="w-full h-9 m-2">
          {selectedRows.length > 0 && (
            <div>
              <Button
                size={'sm'}
                variant="destructive"
                onClick={handleOpenDialog}
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

      <TablePagination table={table} />

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent className="dark:text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda yakin ingin menghapus data ini ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button variant={'destructive'} onClick={handleDelete}>
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

