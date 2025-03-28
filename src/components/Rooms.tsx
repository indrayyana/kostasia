'use client';

import { CabangType, RoomInterface } from '@/types/room';
import { useFetchRoomsByCabang } from '@/hooks/useRoom';
import RoomItem from './RoomItem';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardHeader } from './ui/card';

interface RoomsProps {
  cabang: CabangType;
}

export default function Rooms({ cabang }: RoomsProps) {
  const { data, isPending, isError } = useFetchRoomsByCabang(cabang);

  const skeletonCount = cabang === 'klungkung' ? 6 : 8;
  const rooms = data?.kamar || [];

  if (isError) {
    return (
      <div className="text-center my-20">
        <p>Terjadi kesalahan saat menampilkan data kamar</p>
        <p>Silakan coba refresh halaman atau coba lagi nanti.</p>
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col p-12">
        <p className="text-3xl font-bold my-4">Kamar</p>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            cabang === 'klungkung' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          } gap-5 sm:gap-6 lg:gap-8`}
        >
          {isPending
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <Card key={index} className="dark:bg-slate-800 dark:border-slate-900 max-w-lg">
                  <CardHeader className="p-0">
                    <Skeleton className="h-[14rem] w-full rounded-b-none max-w-lg" />
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2 flex flex-col gap-2">
                      <Skeleton className="rounded-full h-[1.5rem] w-[4rem] max-w-lg" />
                      <Skeleton className="h-[1.5rem] w-[8rem] max-w-lg" />
                      <Skeleton className="h-[1rem] w-[15rem] max-w-lg" />
                      <Skeleton className="mt-4 h-[2rem] w-full max-w-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : rooms.map((room: RoomInterface) => <RoomItem key={room.kamar_id} room={room} />)}
        </div>
      </section>
    </>
  );
}

