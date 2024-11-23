import { Table } from '@tanstack/react-table';
import { Button } from './button';

interface Props<TData> {
  table: Table<TData>;
}

export default function TablePagination<TData>({ table }: Props<TData>) {
  return (
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
  );
}

