'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { RoomType } from '@/types/room';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '@/components/cell-action';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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
      const gambarUrl: string = row.getValue('gambar');
      const nama: string = row.getValue('nama');

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Image
              className="h-10 w-auto cursor-pointer"
              src={gambarUrl}
              width={40}
              height={40}
              alt={`Foto ${nama}`}
              priority
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:border-gray-500">
            <Image
              className="rounded-md"
              src={gambarUrl}
              width={400}
              height={400}
              alt={`Foto ${nama}`}
            />
          </DialogContent>
        </Dialog>
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

