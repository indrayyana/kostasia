'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserInterface } from '@/types/user';
import { useDeleteUser } from '@/hooks/useUser';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface CellActionProps {
  data: UserInterface;
  refecth: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, refecth }) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteUser, isPending } = useDeleteUser({
    onSuccess: () => {
      refecth();
      setOpen(false);
      toast.success('User berhasil dihapus');
    },
    onError: () => {
      toast.error('Terjadi kesalahan saat menghapus user');
    },
  });

  const onDelete = () => {
    // @ts-expect-error off
    deleteUser(data.user_id);
  };

  return (
    <>
      <ConfirmDialog
        dataName={data.nama}
        open={open}
        onOpenChange={setOpen}
        onConfirm={onDelete}
        isLoading={isPending}
      />
      <div className="font-bold">
        <Button className="text-yellow-600" variant={'link'}>
          <SquarePen /> Edit
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

