'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotifInterface } from '@/types/notif';
import { useDeleteNotification } from '@/hooks/useNotification';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface CellActionProps {
  data: NotifInterface;
  refetch: () => void;
}

export const CellAction = ({ data, refetch }: CellActionProps) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteNotif, isPending } = useDeleteNotification({
    onSuccess: () => {
      toast.success('Notifikasi berhasil dihapus', { duration: 3000 });
      refetch();
      setOpen(false);
    },
    onError: () => {
      toast.error('Terjadi kesalahan saat menghapus notifikasi', { duration: 3000 });
    },
  });

  const onDelete = () => {
    // @ts-expect-error off
    deleteNotif(data.notifikasi_id);
  };

  return (
    <>
      <ConfirmDialog
        dataName={data.user.nama}
        open={open}
        onOpenChange={setOpen}
        onConfirm={onDelete}
        isLoading={isPending}
      />
      <div className="font-bold">
        <Button className="text-green-600" variant={'link'}>
          <Eye />
          Detail
        </Button>
        <Button
          className="text-red-600"
          variant={'link'}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash2 /> Hapus
        </Button>
      </div>
    </>
  );
};

