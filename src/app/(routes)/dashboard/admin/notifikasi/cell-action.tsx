/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { NotifInterface } from '@/types/notif';
import api from '@/lib/axios';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CellActionProps {
  data: NotifInterface;
  onDeleteNotif: (notifId: number) => void;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  onDeleteNotif,
}) => {
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      await api.delete(`/notifications/${data.notifikasi_id}`);
      onDeleteNotif(data.notifikasi_id);
      toast.success('Notifikasi berhasil dihapus');
    } catch (error) {
      console.error({ error });
      toast.error('Terjadi kesalahan saat menghapus notifikasi');
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="dark:text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda yakin ingin menghapus data ini ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button variant={'destructive'} onClick={onDelete}>
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="font-bold">
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

