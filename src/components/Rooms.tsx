'use client';

import Image from 'next/image';
import useSWR from 'swr';
import { RoomType } from '@/types/room';
import { fetcher } from '@/utils/fetcher';

interface RoomsProps {
  endpoint: string;
}

export default function Rooms({ endpoint }: RoomsProps) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/${endpoint}`,
    fetcher
  );

  return (
    <>
      {isLoading && (
        <div className="flex h-50 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      )}
      {error ? (
        <p className="text-red-500">Terjadi kesalahan saat menampilkan data</p>
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            data?.kamar.length === 6 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          } gap-5 sm:gap-6 lg:gap-8`}
        >
          {data?.kamar.map((room: RoomType) => (
            <div
              key={room.kamar_id}
              className="text-center bg-blue-500 text-black p-4 border-4 border-black shadow-solid"
            >
              <Image
                src={room.gambar}
                alt={room.nama}
                width={500}
                height={500}
                priority
                className="border-4 border-black object-cover object-top aspect-[1.48/1] w-full"
              />
              <h3 className="mt-6 text-black font-semibold mb-2 text-3xl">
                {room.nama}
              </h3>
              {room.status === 'Kosong' ? (
                <div
                  className="bg-black text-white py-1 w-28 mx-auto"
                  style={{
                    clipPath:
                      'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)',
                  }}
                >
                  <p
                    className="bg-green-700 text-white py-1 mx-auto"
                    style={{
                      width: '6.5rem',
                      clipPath:
                        'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)',
                    }}
                  >
                    {room.status}
                  </p>
                </div>
              ) : (
                <div
                  className="bg-black text-white py-1 w-28 mx-auto"
                  style={{
                    clipPath:
                      'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)',
                  }}
                >
                  <p
                    className="bg-rose-700 text-white py-1 w-28 mx-auto"
                    style={{
                      width: '6.5rem',
                      clipPath:
                        'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)',
                    }}
                  >
                    {room.status}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

