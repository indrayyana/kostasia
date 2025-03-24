'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from './cell-action';
import dateFormat from '@/utils/dateFormat';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

/* eslint-disable @typescript-eslint/no-explicit-any */
export const columns = (refetch: () => void): ColumnDef<any>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="mt-1"
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mt-1"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'total',
    header: 'Total',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'user.nama',
    header: 'Oleh',
  },
  {
    accessorKey: 'kamar.nama',
    header: 'Kamar',
  },
  {
    accessorKey: 'dibuat_pada',
    header: 'Tanggal',
    cell: ({ row }) => {
      const rowDate = row.getValue<string>('dibuat_pada');
      return <p>{dateFormat(rowDate)}</p>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} refecth={refetch} />,
  },
];
