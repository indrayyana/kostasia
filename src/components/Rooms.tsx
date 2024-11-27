import Image from 'next/image';
import { RoomType } from '@/types/room';

interface RoomsProps {
  endpoint: string;
}

async function getRooms(endpoint: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/${endpoint}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(`failed to get all rooms ${error}`);
  }
}

export default async function Rooms({ endpoint }: RoomsProps) {
  const data = await getRooms(endpoint);

  if (!data || !data.kamar) {
    return (
      <p className="text-center">
        Terjadi kesalahan saat menampilkan data kamar
      </p>
    );
  }

  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          data.kamar?.length === 6 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
        } gap-5 sm:gap-6 lg:gap-8`}
      >
        {data.kamar?.map((room: RoomType) => (
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
    </>
  );
}

