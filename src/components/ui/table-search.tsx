import { Search } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { Input } from './input';

interface Props<TData> {
  table: Table<TData>;
}

export default function TableSearch<TData>({ table }: Props<TData>) {
  return (
    <div className="w-90 relative">
      <span className="absolute left-2 top-2.5">
        <Search size={20} className="text-gray-500" />
      </span>
      <Input
        placeholder="Cari"
        value={table.getState().globalFilter ?? ''}
        onChange={(event) => table.setGlobalFilter(String(event.target.value))}
        className="pl-8 pr-4.5 dark:text-white"
      />
    </div>
  );
}

