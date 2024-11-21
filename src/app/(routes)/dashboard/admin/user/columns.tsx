'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '@/components/cell-action';
import { UserType } from '@/types/user';
import { Badge } from '@/components/ui/badge';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<UserType>[] = [
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
    accessorKey: 'telepon',
    header: 'Telepon',
    cell: ({ row }) => {
      return <p>+{row.getValue('telepon')}</p>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role: 'admin' | 'penyewa' | 'pengunjung' = row.getValue('role');
      const roleStyles = {
        admin: 'border-green-500 text-green-600',
        penyewa: 'border-blue-500 text-blue-500',
        pengunjung: 'border-purple-500 text-purple-500',
      };

      return (
        <Badge
          variant="outline"
          className={`font-bold shadow capitalize ${roleStyles[role] || ''}`}
        >
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'foto',
    header: 'Foto',
    cell: ({ row }) => {
      return (
        <Link href={row.getValue('foto')} target="_blank">
          <Image
            className="h-10 w-auto"
            src={row.getValue('foto')}
            width={40}
            height={40}
            alt={row.getValue('nama')}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: 'ktp',
    header: 'KTP',
    cell: ({ row }) => {
      return (
        <Link href={row.getValue('ktp')} target="_blank">
          <Image
            className="h-10 w-auto"
            src={row.getValue('ktp')}
            width={40}
            height={40}
            alt={row.getValue('nama')}
          />
        </Link>
      );
    },
  },
  {
    id: 'actions',
    cell: () => <CellAction />,
  },
];

