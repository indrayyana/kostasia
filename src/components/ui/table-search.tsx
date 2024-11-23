import { Search } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { Input } from './input';

interface Props<TData> {
  table: Table<TData>;
  columnName: string;
}

export default function TableSearch<TData>({
  table,
  columnName,
}: Props<TData>) {
  return (
    <div className="w-90 relative">
      <span className="absolute left-2 top-2.5">
        <Search size={20} className="text-gray-500" />
      </span>
      <Input
        placeholder="Cari"
        value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn(columnName)?.setFilterValue(event.target.value)
        }
        className="pl-8 pr-4.5 dark:text-white"
      />
    </div>
  );
}

