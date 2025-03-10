import Link from 'next/link';
import { memo } from 'react';
import Image from 'next/image';
import { RoomInterface } from '@/types/room';

interface RoomItemProps {
  room: RoomInterface;
}

const RoomItem = memo(({ room }: RoomItemProps) => {
  return (
    <div className="text-center bg-blue-500 text-black p-4 border-4 border-black shadow-solid">
      <Link href={`/${room.cabang}/kamar/${room.kamar_id}`}>
        <Image
          src={room.gambar}
          alt={room.nama}
          title="Foto Kamar"
          width={500}
          height={500}
          priority
          className="border-4 border-black object-cover object-top aspect-[1.48/1] w-full"
        />
        <h3 className="mt-6 text-black font-semibold mb-2 text-3xl">
          {room.nama}
        </h3>
        {room.status === 'kosong' ? (
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
      </Link>
    </div>
  );
});

RoomItem.displayName = 'RoomItem';

export default RoomItem;

