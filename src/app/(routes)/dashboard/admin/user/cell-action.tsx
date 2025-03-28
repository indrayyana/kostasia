'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Image from 'next/image';
import { Loader2, SquarePen, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { UserInterface } from '@/types/user';
import { useDeleteUser, useUpdateUser, useUploadKtp, useUploadProfile } from '@/hooks/useUser';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { updateUserBody } from '@/validations/user';
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

interface CellActionProps {
  data: UserInterface;
  refetch: () => void;
}

export const CellAction = ({ data, refetch }: CellActionProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [previewKtp, setPreviewKtp] = useState<string | null>(null);
  const [imageProfile, setImageProfile] = useState<File | null>(null);
  const [fotoKtp, setFotoKtp] = useState<File | null>(null);

  useEffect(() => {
    if (openEdit) {
      setPreviewProfile(data.foto || null);
      setPreviewKtp(data.ktp || null);
      setImageProfile(null);
      setFotoKtp(null);
    }
  }, [openEdit, data]);

  const { mutate: uploadProfile, isPending: uploadProfileIsLoading } = useUploadProfile({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message
          : 'Terjadi kesalahan saat mengupload foto profil';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const { mutate: uploadKtp, isPending: uploadKtpIsLoading } = useUploadKtp({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);

      toast.error('Terjadi kesalahan saat mengupload foto KTP', { duration: 3000 });
    },
  });

  const { mutate: updateUser, isPending: updateUserIsLoading } = useUpdateUser({
    onSuccess: () => {
      refetch();
      toast.success('Berhasil mengedit data user', { duration: 3000 });
      setOpenEdit(false);
    },
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message
          : 'Terjadi kesalahan saat mengedit data user';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const form = useForm<z.infer<typeof updateUserBody>>({
    resolver: zodResolver(updateUserBody),
    defaultValues: {
      nama: data.nama,
      email: data.email,
      telepon: data.telepon,
      role: data.role,
      foto: undefined,
      ktp: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof updateUserBody>) => {
    if (imageProfile) {
      uploadProfile({
        param: { userId: data.user_id },
        body: { file: imageProfile },
      });
    }

    if (fotoKtp) {
      uploadKtp({
        param: { userId: data.user_id },
        body: { file: fotoKtp },
      });
    }

    updateUser({
      param: { userId: data.user_id },
      body: {
        nama: values.nama,
        email: values.email,
        telepon: values.telepon,
        role: values.role,
        foto: values.foto,
        ktp: values.ktp,
      },
    });
  };

  const { mutate: deleteUser, isPending } = useDeleteUser({
    onSuccess: () => {
      toast.success('User berhasil dihapus', { duration: 3000 });
      refetch();
      setOpenDelete(false);
    },
    onError: () => {
      toast.error('Terjadi kesalahan saat menghapus user', { duration: 2000 });
    },
  });

  const onDelete = () => {
    deleteUser({ userId: data.user_id });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageProfile(file);
      setPreviewProfile(URL.createObjectURL(file));
    }
  };

  const handleKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoKtp(file);
      setPreviewKtp(URL.createObjectURL(file));
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
              <DialogTitle>Edit Data User</DialogTitle>
              <DialogDescription>Klik simpan jika sudah selesai mengedit data.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5 pb-8">
                  {!!previewProfile && (
                    <Image
                      src={previewProfile}
                      key={previewProfile}
                      alt="foto profile"
                      width={200}
                      height={200}
                      className="w-auto h-30 mx-auto"
                      priority={true}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="foto"
                    render={() => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Foto Profil (PNG/JPG/SVG/WEBP)</FormLabel>
                        <FormControl>
                          <Input id="foto" type="file" onChange={handleProfileChange} />
                        </FormControl>
                        <FormDescription>Maksimal ukuran file 2MB</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input id="nama" placeholder="Nama" autoComplete="off" {...field} className="text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            autoComplete="off"
                            {...field}
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telepon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No Telepon</FormLabel>
                        <FormControl>
                          <Input
                            id="telepon"
                            type="number"
                            placeholder="No Telepon"
                            autoComplete="off"
                            {...field}
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-black">
                              <SelectValue placeholder="Pilih role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pengunjung">{'Pengunjung'}</SelectItem>
                            <SelectItem value="penyewa">{'Penyewa'}</SelectItem>
                            <SelectItem value="admin">{'Admin'}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ktp"
                    render={() => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Foto KTP (PNG/JPG/SVG/WEBP)</FormLabel>
                        <FormControl>
                          <Input id="ktp" type="file" onChange={handleKtpChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!!previewKtp && (
                    <Image
                      src={previewKtp}
                      key={previewKtp}
                      alt="foto profile"
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
                    disabled={updateUserIsLoading || uploadProfileIsLoading || uploadKtpIsLoading}
                  >
                    {updateUserIsLoading || uploadProfileIsLoading || uploadKtpIsLoading ? (
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

