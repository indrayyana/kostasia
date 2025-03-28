'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { UserInterface } from '@/types/user';
import { CellAction } from './cell-action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = (refetch: () => void): ColumnDef<UserInterface>[] => [
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
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'telepon',
    header: 'Telepon',
    cell: ({ row }) => {
      if (row.getValue('telepon')) {
      }
      return <p>{row.getValue('telepon') ? row.getValue('telepon') : 'kosong'}</p>;
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
        <Badge variant="outline" className={`font-bold shadow capitalize ${roleStyles[role] || ''}`}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'foto',
    header: 'Foto',
    cell: ({ row }) => {
      const fotoUrl: string = row.getValue('foto');
      const nama: string = row.getValue('nama');

      return (
        <Dialog>
          <DialogTrigger asChild>
            {fotoUrl ? (
              <Image
                className="h-auto w-10 cursor-pointer rounded-full"
                src={fotoUrl}
                width={40}
                height={40}
                alt={`Foto ${nama}`}
                title="Foto Profil"
                priority={true}
              />
            ) : (
              <p>kosong</p>
            )}
          </DialogTrigger>
          {fotoUrl && (
            <DialogContent className="sm:max-w-[425px] dark:border-gray-500">
              <Image
                className="rounded-md"
                src={fotoUrl}
                width={400}
                height={400}
                alt={`Foto ${nama}`}
                title="Foto Profil"
                priority={true}
              />
            </DialogContent>
          )}
        </Dialog>
      );
    },
  },
  {
    accessorKey: 'ktp',
    header: 'KTP',
    cell: ({ row }) => {
      const ktpUrl: string = row.getValue('ktp');
      const nama: string = row.getValue('nama');

      return (
        <Dialog>
          <DialogTrigger asChild>
            {ktpUrl ? (
              <Image
                className="h-10 w-auto cursor-pointer"
                src={ktpUrl}
                width={40}
                height={40}
                alt={`KTP ${nama}`}
                title="Foto KTP"
                priority={true}
              />
            ) : (
              <p>kosong</p>
            )}
          </DialogTrigger>
          {ktpUrl && (
            <DialogContent className="sm:max-w-[425px] dark:border-gray-500">
              <Image
                className="rounded-md"
                src={ktpUrl}
                width={400}
                height={400}
                alt={`KTP ${nama}`}
                title="Foto KTP"
                priority={true}
              />
            </DialogContent>
          )}
        </Dialog>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} refetch={refetch} />,
  },
];
