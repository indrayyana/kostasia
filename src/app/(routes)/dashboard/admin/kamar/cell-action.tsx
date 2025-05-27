'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Image from 'next/image';
import { Loader2, SquarePen, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RoomInterface } from '@/types/room';
import { useDeleteRoom, useUpdateRoom, useUploadRoomImage } from '@/hooks/useRoom';
import { updateRoomBody } from '@/validations/room';

interface CellActionProps {
  data: RoomInterface;
  refetch: () => void;
}

export const CellAction = ({ data, refetch }: CellActionProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageRoom, setImageRoom] = useState<File | null>(null);

  const form = useForm<z.infer<typeof updateRoomBody>>({
    resolver: zodResolver(updateRoomBody),
    defaultValues: {
      nama: data.nama,
      harga: data.harga,
      cabang: data.cabang,
      status: data.status,
      gambar: undefined,
    },
  });

  useEffect(() => {
    if (openEdit) {
      form.reset();

      setPreviewImage(data.gambar || null);
      setImageRoom(null);
    }
  }, [openEdit, data, form]);

  const { mutate: uploadRoomImage, isPending: uploadRoomImageIsLoading } = useUploadRoomImage({
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message
          : 'Terjadi kesalahan saat mengupload foto kamar';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const { mutate: updateRoom, isPending: updateRoomIsLoading } = useUpdateRoom({
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message
          : 'Terjadi kesalahan saat mengedit data kamar';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const onSubmit = async (values: z.infer<typeof updateRoomBody>) => {
    try {
      if (imageRoom) {
        await new Promise<void>((resolve, reject) => {
          uploadRoomImage(
            {
              param: { cabang: data.cabang, roomId: data.kamar_id },
              body: { file: imageRoom },
            },
            {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            }
          );
        });
      }

      await new Promise<void>((resolve, reject) => {
        updateRoom(
          {
            param: { cabang: data.cabang, roomId: data.kamar_id },
            body: {
              nama: values.nama,
              harga: values.harga,
              cabang: values.cabang,
              status: values.status,
              ...(imageRoom && { gambar: values.gambar }),
            },
          },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          }
        );
      });

      refetch();
      toast.success('Berhasil mengedit data kamar', { duration: 3000 });
      setOpenEdit(false);
    } catch (error) {
      console.error('Update Room Failed:', error);
    }
  };

  const { mutate: deleteRoom, isPending } = useDeleteRoom({
    onSuccess: () => {
      toast.success('Kamar berhasil dihapus', { duration: 3000 });
      refetch();
      setOpenDelete(false);
    },
    onError: () => {
      toast.error('Terjadi kesalahan saat menghapus kamar', { duration: 2000 });
    },
  });

  const onDelete = () => {
    deleteRoom({ cabang: data.cabang, roomId: data.kamar_id });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageRoom(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <ConfirmDialog
        dataName={data.nama}
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={onDelete}
        isLoading={isPending}
      />
      <div className="font-bold">
        <Dialog open={openEdit} onOpenChange={(openEdit) => setOpenEdit(openEdit)}>
          <DialogTrigger asChild>
            <Button className="text-yellow-600" variant={'link'}>
              <SquarePen /> Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="xsm:max-w-100 max-h-115 text-black-2 dark:text-white overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Edit Data Kamar</DialogTitle>
              <DialogDescription>Klik simpan jika sudah selesai mengedit data.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5 pb-8">
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nama<sup className="text-red-600 dark:text-red-400">*</sup>
                        </FormLabel>
                        <FormControl>
                          <Input id="nama" placeholder="Nama" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="harga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Harga<sup className="text-red-600 dark:text-red-400">*</sup>
                        </FormLabel>
                        <FormControl>
                          <Input id="harga" type="number" placeholder="Harga" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cabang"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Cabang<sup className="text-red-600 dark:text-red-400">*</sup>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih cabang kost" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="denpasar">{'Denpasar'}</SelectItem>
                            <SelectItem value="klungkung">{'Klungkung'}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status<sup className="text-red-600 dark:text-red-400">*</sup>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih status kamar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="terisi">{'Terisi'}</SelectItem>
                            <SelectItem value="kosong">{'Kosong'}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gambar"
                    render={() => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Foto Kamar Kost (PNG/JPG)</FormLabel>
                        <FormControl>
                          <Input id="gambar" type="file" accept="image/*" onChange={handleImageChange} />
                        </FormControl>
                        <FormDescription>Maksimal ukuran file 3MB</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!!previewImage && (
                    <Image
                      src={previewImage}
                      key={previewImage}
                      alt="foto kamar"
                      width={200}
                      height={200}
                      className="w-auto h-30 mx-auto"
                    />
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="dark:text-white font-bold"
                    disabled={updateRoomIsLoading || uploadRoomImageIsLoading}
                  >
                    {updateRoomIsLoading || uploadRoomImageIsLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" />
                        <span>Loading</span>
                      </div>
                    ) : (
                      'Simpan'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Button
          className="text-red-600"
          variant={'link'}
          onClick={() => {
            setOpenDelete(true);
          }}
        >
          <Trash2 /> Hapus
        </Button>
      </div>
    </>
  );
};

