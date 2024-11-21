'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { RoomType } from '@/types/room';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '@/components/cell-action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<RoomType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="mt-1"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
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
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'gambar',
    header: 'Gambar',
    cell: ({ row }) => {
      return (
        <Link href={row.getValue('gambar')} target="_blank">
          <Image
            className="h-10 w-auto"
            src={row.getValue('gambar')}
            width={40}
            height={40}
            alt={row.getValue('nama')}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'cabang',
    header: 'Cabang',
  },
  {
    id: 'actions',
    cell: () => <CellAction />,
  },
];

