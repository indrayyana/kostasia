'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { NotifInterface } from '@/types/notif';
import { CellAction } from './cell-action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = (
  onDeleteNotif: (notifId: number) => void
): ColumnDef<NotifInterface>[] => [
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
    accessorKey: 'judul',
    header: 'Judul',
  },
  {
    accessorKey: 'text',
    header: 'Text',
  },
  {
    accessorKey: 'is_read',
    header: 'Status',
    cell: ({ row }) => {
      const rowStatus = row.getValue('is_read');
      if (rowStatus) {
        return <p>Dibaca</p>;
      } else {
        return <p>Terkirim</p>;
      }
    },
  },
  {
    accessorKey: 'user_id',
    header: 'Kepada',
  },
  {
    accessorKey: 'created_at',
    header: 'Tanggal Dikirim',
    cell: ({ row }) => {
      const rowDate = row.getValue<string>('created_at');
      const date = new Date(rowDate);
      const formattedDate = date.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      return <p>{formattedDate}</p>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction data={row.original} onDeleteNotif={onDeleteNotif} />
    ),
  },
];

