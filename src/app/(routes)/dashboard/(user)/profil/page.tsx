'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Mail, Upload, User, Phone, MarsStroke, CircleUserRound, Loader2 } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import UserLayout from '@/components/Layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/components/AuthProvider';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserBody } from '@/validations/user';
import { useUpdateUser, useUploadKtp, useUploadProfile } from '@/hooks/useUser';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Profil = () => {
  const { user, refetch, isPending } = useAuth();
  const [imageProfile, setImageProfile] = useState<File | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [fotoKtp, setFotoKtp] = useState<File | null>(null);
  const [previewKtp, setPreviewKtp] = useState<string | null>(null);

  useEffect(() => {
    console.log(user?.gender);

    setPreviewProfile(user?.foto || null);
    setPreviewKtp(user?.ktp || null);

    setImageProfile(null);
    setFotoKtp(null);
  }, [user]);

  const { mutate: updateUser, isPending: updateUserIsLoading } = useUpdateUser({
    onSuccess: () => {
      toast.success('Berhasil memperbarui profil', { duration: 3000 });
    },
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message
          : 'Terjadi kesalahan saat memperbarui profil';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

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

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message
          : 'Terjadi kesalahan saat mengupload foto KTP';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const form = useForm<z.infer<typeof updateUserBody>>({
    resolver: zodResolver(updateUserBody),
    values: {
      nama: user?.nama || '',
      telepon: user?.telepon || '',
      gender: user?.gender,
      ktp: undefined,
      foto: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateUserBody>) => {
    try {
      if (imageProfile) {
        await new Promise<void>((resolve, reject) => {
          uploadProfile(
            {
              param: { userId: user?.user_id as string },
              body: { file: imageProfile },
            },
            {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            }
          );
        });
      }

      if (fotoKtp) {
        await new Promise<void>((resolve, reject) => {
          uploadKtp(
            {
              param: { userId: user?.user_id as string },
              body: { file: fotoKtp },
            },
            {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            }
          );
        });
      }

      updateUser({
        nama: values.nama,
        telepon: values.telepon,
        gender: values.gender,
        ...(imageProfile && { foto: values.foto }),
        ...(fotoKtp && { ktp: values.ktp }),
      });
    } catch (error) {
      console.error('Update gagal:', error);
    }
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
    <UserLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profil" />

        <div className="w-full">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <p className="font-medium text-black dark:text-white">Informasi Profil</p>
            </div>
            <div className="p-7">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mb-5.5 flex flex-col gap-5.5">
                    <div className="h-40 w-full mb-4 flex justify-center">
                      {isPending ? (
                        <Skeleton className="rounded-none h-[160px] w-[160px]" />
                      ) : previewProfile ? (
                        <Image
                          src={previewProfile}
                          width={160}
                          height={160}
                          alt="User"
                          title="Foto Profil"
                          className="w-auto h-40"
                        />
                      ) : (
                        <CircleUserRound size={100} />
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="foto"
                      render={() => (
                        <FormItem>
                          <FormLabel>Foto Profil</FormLabel>
                          <FormControl>
                            <div className="relative block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
                              <Input
                                id="foto"
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                onChange={handleProfileChange}
                              />
                              <div className="flex flex-col items-center justify-center space-y-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                  <Upload size={20} />
                                </span>
                                <p className="text-center">
                                  <span className="text-primary">Klik untuk upload</span> atau drag & drop
                                </p>
                                <p className="mt-1.5">PNG atau JPG</p>
                                <p>(ukuran maksimal 3MB)</p>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex max-sm:flex-col gap-5.5">
                      <FormField
                        control={form.control}
                        name="nama"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/2">
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                              {isPending ? (
                                <div className="relative">
                                  <Skeleton className="h-10" />
                                </div>
                              ) : (
                                <div className="relative">
                                  <span className="absolute left-4.5 top-2.5">
                                    <User size={20} />
                                  </span>
                                  <Input
                                    type="text"
                                    id="nama"
                                    placeholder="Nama Lengkap"
                                    autoComplete="off"
                                    {...field}
                                    className="bg-gray pl-11.5 pr-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                  />
                                </div>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telepon"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/2">
                            <FormLabel>Nomor Telepon</FormLabel>
                            <FormControl>
                              {isPending ? (
                                <div className="relative">
                                  <Skeleton className="h-10" />
                                </div>
                              ) : (
                                <div className="relative">
                                  <span className="absolute left-4.5 top-2.5">
                                    <Phone size={20} />
                                  </span>
                                  <Input
                                    className="bg-gray pl-11.5 pr-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                    id="telepon"
                                    type="number"
                                    placeholder="Nomor Telepon"
                                    autoComplete="off"
                                    {...field}
                                  />
                                </div>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex max-sm:flex-col gap-5.5">
                      <FormItem className="w-full sm:w-1/2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          {isPending ? (
                            <div className="relative">
                              <Skeleton className="h-10" />
                            </div>
                          ) : (
                            <div className="relative">
                              <span className="absolute left-4.5 top-2.5">
                                <Mail size={20} />
                              </span>
                              <Input
                                disabled
                                className="bg-gray pl-11.5 pr-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                type="email"
                                id="email"
                                placeholder="contoh@gmail.com"
                                autoComplete="off"
                                value={user?.email || ''}
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/2">
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <FormControl>
                              {isPending ? (
                                <div className="relative">
                                  <Skeleton className="h-10" />
                                </div>
                              ) : (
                                <div className="relative">
                                  <span className="absolute left-4.5 top-2.5">
                                    <MarsStroke size={20} />
                                  </span>
                                  <Select onValueChange={field.onChange} value={field.value || user?.gender}>
                                    <FormControl>
                                      <SelectTrigger className="bg-gray pl-11.5 pr-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white">
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="laki_laki">{'Laki-laki'}</SelectItem>
                                      <SelectItem value="perempuan">{'Perempuan'}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="ktp"
                      render={() => (
                        <FormItem>
                          <FormLabel>Kartu Tanda Penduduk (KTP)</FormLabel>
                          <FormControl>
                            <div
                              id="FileUpload"
                              className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                            >
                              <Input
                                id="ktp"
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                onChange={handleKtpChange}
                              />
                              <div className="flex flex-col items-center justify-center space-y-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                  <Upload size={20} />
                                </span>
                                <p className="text-center">
                                  <span className="text-primary">Klik untuk upload</span> atau drag & drop
                                </p>
                                <p className="mt-1.5">PNG atau JPG</p>
                                <p>(ukuran maksimal 3MB)</p>
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="h-40 w-full mb-4 flex justify-center">
                      {isPending ? (
                        <Skeleton className="rounded-none h-[160px] w-[160px]" />
                      ) : previewKtp ? (
                        <Image
                          src={previewKtp}
                          width={160}
                          height={160}
                          alt="User"
                          title="Foto Profil"
                          className="w-auto h-40"
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <Button
                      variant={'destructive'}
                      disabled={updateUserIsLoading || uploadProfileIsLoading || uploadKtpIsLoading}
                      onClick={() => form.reset()}
                      type="button"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateUserIsLoading || uploadProfileIsLoading || uploadKtpIsLoading}
                      className="dark:text-white"
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
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profil;

