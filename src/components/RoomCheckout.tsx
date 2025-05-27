'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { format, startOfDay, addMonths, startOfMonth, parse } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { CabangType } from '@/types/room';
import { useFetchRoomDetail } from '@/hooks/useRoom';
import { useCreateTransaction } from '@/hooks/useTransaction';
import Loader from './common/Loader';
import { Button } from './ui/button';
import { isBrowser } from '@/utils/browser';
import { useAuth } from './AuthProvider';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';
import { Calendar } from './ui/calendar';
import { Checkbox } from './ui/checkbox';
import { genderFormat } from '../utils/format';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    snap: any;
  }
}

interface RoomCheckoutProps {
  id: string;
  cabang: CabangType;
}

export default function RoomCheckout({ id, cabang }: RoomCheckoutProps) {
  const searchParams = useSearchParams();
  const { user, isPending: userPending } = useAuth();
  const { data, isPending, isError } = useFetchRoomDetail(cabang, id);
  const { mutate: createTransaction } = useCreateTransaction();

  const durationParams = searchParams.get('duration') || 'bulanan';
  const dateParams = searchParams.get('date');
  const parsedDate =
    dateParams && /^\d{2}-\d{2}-\d{2}$/.test(dateParams) ? parse(dateParams, 'dd-MM-yy', new Date()) : undefined;

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState<Date | undefined>(parsedDate);
  const [duration, setDuration] = useState<string | null>(durationParams);
  const [previewKtp, setPreviewKtp] = useState<string | null>(null);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [fotoKtp, setFotoKtp] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    setPreviewKtp(user?.foto || null);

    if (dateParams || durationParams) {
      const cleanUrl = window.location.pathname;
      router.replace(cleanUrl, { scroll: false });
    }
  }, [user, dateParams, durationParams, router]);

  if (isPending || userPending) {
    return <Loader />;
  }

  if (!data) {
    notFound();
  }

  const getPrice = () => {
    if (duration === 'harian') return { label: 'Rp100.000', satuan: 'per hari', info: 'sehari' };
    if (duration === 'mingguan') return { label: 'Rp300.000', satuan: 'per minggu', info: 'seminggu' };
    return { label: 'Rp500.000', satuan: 'per bulan', info: 'sebulan' };
  };

  const room = data.kamar || {};

  const handleCheckout = async () => {
    const payload = {
      user: {
        id: user?.user_id,
        fullname: user?.nama,
        email: user?.email,
        phone: user?.telepon,
      },
      transaction: {
        room: room.kamar_id,
        total: 500000,
      },
    };

    // @ts-expect-error off
    createTransaction(payload, {
      onSuccess: (response) => {
        const token = response?.data?.transaction?.token;
        if (token && isBrowser()) {
          window.snap.pay(token);
        } else {
          console.error('Transaction token not found');
        }
      },
      onError: () => {
        toast.error('Terjadi kesalahan saat pembayaran');
      },
    });
  };

  // const roomCheckoutBody = z
  //   .object({
  //     nama: z.string().min(1, 'Nama tidak boleh kosong').max(20),
  //     telepon: z.string().min(1, 'Telepon tidak boleh kosong').max(20),
  //     gender: z.enum(['laki_laki', 'perempuan'], {
  //       errorMap: () => ({ message: 'Gender harus diisi dengan nilai yang benar' }),
  //     }),
  //     ktp: z.string().min(1).max(255).nullable(),
  //     fasilitas: z.enum(['kasur', 'lemari'], {
  //       errorMap: () => ({ message: 'Fasilitas harus diisi dengan nilai yang benar' }),
  //     }),
  //     tanggal: z.date(),
  //     durasi: z.enum(['harian', 'mingguan', 'bulanan'], {
  //       errorMap: () => ({ message: 'Durasi harus diisi dengan nilai yang benar' }),
  //     }),
  //   })
  //   .strict();

  // const form = useForm<z.infer<typeof roomCheckoutBody>>({
  //   resolver: zodResolver(roomCheckoutBody),
  //   defaultValues: {
  //     nama: '',
  //     telepon: '',
  //     gender: undefined,
  //     ktp: undefined,
  //   },
  // });

  // const onSubmit = async (values: z.infer<typeof roomCheckoutBody>) => {
  //   console.log(values);
  // };

  const handleKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoKtp(file);
      setPreviewKtp(URL.createObjectURL(file));
    }
  };

  return (
    <main className="p-6">
      {isError ? (
        <p className="text-red-500 text-center">Terjadi kesalahan saat menampilkan data</p>
      ) : (
        <section className="grid lg:grid-cols-4 text-black dark:text-white gap-8 max-w-5xl mx-auto my-10">
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>
                        Nama penyewa<sup className="text-red-600 dark:text-red-400">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input id="nama" placeholder="Nama" autoComplete="off" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form> */}

          {/* KIRI - Informasi Penyewa */}
          <div className="md:col-span-2 space-y-5">
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-base font-semibold">Informasi penyewa</p>
                <p className="text-sm underline cursor-pointer font-medium">Edit</p>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Nama penyewa</span>
                  <span className="font-medium">{user?.nama || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nomor HP</span>
                  <span className="font-medium">
                    {user?.telepon ? user.telepon : <span className="text-red-500">Nomor HP belum terisi</span>}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Jenis kelamin</span>
                  <span className="font-medium">
                    {user?.gender ? (
                      genderFormat(user.gender)
                    ) : (
                      <span className="text-red-500">Jenis kelamin belum terisi</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <hr />
            <div className="space-y-3">
              <p className="text-base font-semibold">Foto KTP</p>
              <Input id="ktp" type="file" accept="image/*" onChange={handleKtpChange} />
              {!!previewKtp && (
                <Image src={previewKtp} alt="foto profile" width={200} height={200} className="w-auto h-30 mx-auto" />
              )}
            </div>

            <hr />
            <div className="space-y-3">
              <p className="text-base font-semibold">Fasilitas pilihan</p>
              <div className="flex space-x-2 text-sm">
                <Checkbox id="kasur" className="border-gray-500" />
                <label htmlFor="kasur">Kasur</label>
              </div>
              <div className="flex space-x-2 text-sm">
                <Checkbox id="lemari" className="border-gray-500" />
                <label htmlFor="lemari">Lemari</label>
              </div>
            </div>

            <hr />
            <div className="space-y-3">
              <p className="text-base font-semibold">Tanggal mulai ngekost</p>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn('w-full h-12 justify-start text-left font-normal', !date && 'text-muted-foreground')}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'EEEE, dd MMMM yyyy', { locale: localeId }) : <span>Mulai kost</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setOpen(false);
                    }}
                    initialFocus
                    locale={localeId}
                    disabled={(date) => date < startOfDay(new Date())}
                    fromMonth={startOfMonth(new Date())}
                    toMonth={startOfMonth(addMonths(new Date(), 2))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <hr />
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-base font-semibold">Biaya sewa kost</p>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <p className="text-sm underline cursor-pointer font-medium">Edit</p>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="font-bold">Biaya sewa kost</DialogTitle>
                    </DialogHeader>

                    <RadioGroup
                      defaultValue={`${duration}`}
                      onValueChange={(value) => setDuration(value)}
                      className="gap-5"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="harian" id="r1" />
                        <div className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <Label htmlFor="r1">Per Hari</Label>
                            <span className="text-gray-500 dark:text-gray-300 text-xs font-light">
                              Dibayar sehari sekali
                            </span>
                          </div>
                          <span className="font-medium">Rp100.000</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mingguan" id="r2" />
                        <div className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <Label htmlFor="r2">Per Minggu</Label>
                            <span className="text-gray-500 dark:text-gray-300 text-xs font-light">
                              Dibayar seminggu sekali
                            </span>
                          </div>
                          <span className="font-medium">Rp300.000</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bulanan" id="r3" />
                        <div className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <Label htmlFor="r3">Per Bulan</Label>
                            <span className="text-gray-500 dark:text-gray-300 text-xs font-light">
                              Dibayar sebulan sekali
                            </span>
                          </div>
                          <span className="font-medium">Rp500.000</span>
                        </div>
                      </div>
                    </RadioGroup>
                    <DialogFooter>
                      <Button
                        type="button"
                        className="dark:text-white font-bold"
                        onClick={() => {
                          setOpenDialog(false);
                        }}
                      >
                        Simpan
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Harga sewa {getPrice().satuan}</span>
                  <span className="font-medium">{getPrice().label}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-300 text-xs font-light">
                  Dibayar {getPrice().info} sekali
                </span>
              </div>
            </div>

            <hr />
            <div className="space-y-3">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <p className="text-base font-semibold">Total biaya sewa kost</p>
                  <span className="font-medium">Rp500.000</span>
                </div>
                <div className="flex justify-end">
                  <span className="text-gray-500 dark:text-gray-300 text-xs font-light capitalize">
                    {getPrice().satuan}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleCheckout}
                className="w-full mt-8 rounded-lg bg-blue-700 hover:bg-blue-800 text-white"
              >
                Bayar Sewa
              </Button>
            </div>
          </div>

          {/* KANAN - Rincian Pembayaran */}
          <div className="md:col-span-2 border p-4 rounded-lg hidden lg:block shadow space-y-6 h-fit lg:sticky lg:top-28">
            {/* Gambar + Deskripsi Samping */}
            <div className="flex gap-6 items-start">
              <Image
                src={room.gambar}
                alt={room.nama}
                width={100}
                height={100}
                className="rounded-md object-cover h-22"
              />
              <div className="flex-1 space-y-1.5">
                <p className="">Kamar {Number(id) > 10 ? Number(id) - 10 : id}</p>
                <p className="capitalize font-semibold">Kost {room.cabang}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">K. Mandi Dalam - Kasur - Lemari</p>
              </div>
            </div>

            {/* Rincian Pembayaran */}
            <div className="border-t pt-6">
              <p className="font-semibold text-base mb-2">Rincian pembayaran</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Biaya sewa kos</span>
                  <span>{getPrice().label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deposit</span>
                  <span>Rp300.000</span>
                </div>
              </div>
              <hr className="my-5" />
              <div className="flex mb-2 justify-between font-semibold text-base">
                <span>Total pembayaran</span>
                <span>Rp500.000</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
