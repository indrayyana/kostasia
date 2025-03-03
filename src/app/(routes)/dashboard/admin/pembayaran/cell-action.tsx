'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotifInterface } from '@/types/notif';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface CellActionProps {
  data: NotifInterface;
  refecth: () => void;
}

export const CellAction = ({ data, refecth }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const isPending = false;
  // const { mutate: deleteNotif, isPending } = useDeleteNotification({
  //   onSuccess: () => {
  //     refecth();
  //     setOpen(false);
  //     toast.success('Notifikasi berhasil dihapus');
  //   },
  //   onError: () => {
  //     toast.error('Terjadi kesalahan saat menghapus notifikasi');
  //   },
  // });

  const onDelete = () => {
    // deleteNotif(data.notifikasi_id);
    refecth();
    toast('coming soon');
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

