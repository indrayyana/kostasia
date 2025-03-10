import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  Table as TableType,
} from '@tanstack/react-table';
import { Button } from './button';
import { Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import TablePagination from './table-pagination';
import { Skeleton } from './skeleton';

interface Props<TData extends { user_id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
  isLoading: boolean;
}

export default function MyTable<
  TData extends { user_id: string | number },
  TValue
>({ table, columns, isLoading }: Props<TData, TValue>) {
  const selectedRows = table.getSelectedRowModel().rows;

  const handleDelete = () => {
    const selectedIds = selectedRows.map((row) => row.original.user_id);
    alert(`Hapus ID: ${selectedIds}`);
    // TODO: Tambahkan logika untuk menghapus data di sini
  };

  return (
    <>
      <div className="rounded-md border bg-white mt-5 dark:bg-boxdark dark:text-white dark:border-gray-500">
        <div className="w-full h-9 m-2">
          {selectedRows.length > 0 && (
            <div>
              <Button size={'sm'} variant="destructive" onClick={handleDelete}>
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
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index} className="dark:border-gray-500">
                  <TableCell colSpan={columns.length}>
                    <Skeleton className="h-[40px] w-full" />
                  </TableCell>
                </TableRow>
              ))
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
    </>
  );
}

