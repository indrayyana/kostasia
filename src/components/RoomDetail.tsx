'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';
import { format, startOfDay, addMonths, startOfMonth } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import Header from '@/components/ui/header';
import { CabangType, RoomInterface } from '@/types/room';
import { useFetchRoomDetail } from '@/hooks/useRoom';
import { Skeleton } from './ui/skeleton';
import NotFound from '@/app/(error)/not-found';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from './ui/calendar';

interface RoomDetailProps {
  id: string;
  cabang: CabangType;
}

export default function RoomDetail({ id, cabang }: RoomDetailProps) {
  const router = useRouter();

  const { data, isPending, isError } = useFetchRoomDetail(cabang, id);
  const [open, setOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);

  const [date, setDate] = useState<Date>();
  const [duration, setDuration] = useState<'harian' | 'mingguan' | 'bulanan'>('bulanan');

  const handleClickAjukan = () => {
    if (!date) {
      setOpen(true);
      return;
    }

    if (!duration) {
      setOpenSelect(true);
      return;
    }

    router.push(
      `/booking/${room.cabang}/${room.kamar_id}?date=${format(date, 'dd-MM-yy', {
        locale: localeId,
      })}&duration=${duration}`
    );
  };

  if (!isPending && !data) {
    return <NotFound />;
  }

  const room: RoomInterface = data?.kamar || {};

  const getPrice = () => {
    if (duration === 'harian') return { label: 'Rp100.000', satuan: '/hari' };
    if (duration === 'mingguan') return { label: 'Rp300.000', satuan: '/minggu' };
    return { label: 'Rp500.000', satuan: '/bulan' };
  };

  return (
    <>
      <Header title={`Kost ${cabang}`} title2={room.nama} />
      <main className="p-6 sm:p-12 bg-gray-100 dark:bg-slate-800">
        {isError ? (
          <p className="text-red-500 text-center">Terjadi kesalahan saat menampilkan data</p>
        ) : (
          <section className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:w-1/2 bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-md">
              {isPending ? (
                <Skeleton className="rounded-2xl w-full aspect-[1.48/1]" />
              ) : (
                <Image
                  src={room.gambar}
                  alt={room.nama}
                  title="Foto Kamar"
                  width={800}
                  height={400}
                  priority={true}
                  className="rounded-t-2xl w-full object-cover aspect-[1.48/1]"
                />
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold mt-2 mb-6 capitalize">{`${room.nama} - ${room.cabang}`}</h2>

                <p className="font-bold mb-2">Spesifikasi Tipe Kamar</p>
                <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                  <li>3 x 4 meter</li>
                  <li>Kamar mandi dalam</li>
                  <li>Listrik token</li>
                  <li>Air Sumur bor</li>
                </ul>

                <p className="font-bold mb-2">Fasilitas Pilihan</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Kasur</li>
                  <li>Lemari pakaian</li>
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:w-1/2 h-fit lg:sticky lg:top-28 fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 z-40 p-8 sm:rounded-none shadow-[0_-2px_10px_rgba(0,0,0,0.1)] lg:rounded-xl lg:shadow-md lg:p-8">
              {room.status === 'kosong' && (
                <>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-200 flex items-center">
                    {getPrice().label}
                    <span className="text-gray-600 dark:text-gray-400 text-base font-normal">
                      {getPrice().satuan}
                    </span>{' '}
                  </div>
                  <div className="mt-3 flex justify-between gap-3 sm:gap-6 lg:gap-6">
                    <div className="w-1/2">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full h-12 justify-start text-left font-normal',
                              !date && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'dd/MM/yy', { locale: localeId }) : <span>Mulai kost</span>}
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
                    <div className="w-1/2">
                      <Select
                        open={openSelect}
                        onOpenChange={setOpenSelect}
                        value={duration}
                        onValueChange={(value) => {
                          setDuration(value as 'harian' | 'mingguan' | 'bulanan');
                          setOpenSelect(false);
                        }}
                      >
                        <SelectTrigger className="w-full h-12">
                          <SelectValue placeholder="Per Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="harian">Per Hari</SelectItem>
                            <SelectItem value="mingguan">Per Minggu</SelectItem>
                            <SelectItem value="bulanan">Per Bulan</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {isPending ? (
                <Skeleton className="mt-6 w-full h-[3rem]" />
              ) : room.status === 'terisi' ? (
                <Button
                  title="Kamar Telah Terisi"
                  className="block cursor-not-allowed w-full my-3 py-3 font-semibold transition text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm px-4 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Kamar Telah Terisi
                </Button>
              ) : (
                <Button
                  onClick={handleClickAjukan}
                  title="Ajukan Sewa"
                  className="block w-full mt-6 py-3 font-semibold transition text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ajukan Sewa
                </Button>
              )}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
