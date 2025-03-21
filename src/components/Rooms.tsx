import { RoomInterface } from '@/types/room';
import RoomItem from './RoomItem';
import logger from '@/utils/logger';

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
    logger.error(`failed to get all rooms ${error}`, { message: error });
    return { kamar: [] };
  }
}

export default async function Rooms({ endpoint }: RoomsProps) {
  const data = await getRooms(endpoint);
  const rooms = data?.kamar || [];

  if (rooms.length < 1) {
    return (
      <div className="text-center">
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
            rooms.length === 6 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          } gap-5 sm:gap-6 lg:gap-8`}
        >
          {rooms.map((room: RoomInterface) => (
            <RoomItem key={room.kamar_id} room={room} />
          ))}
        </div>
      </section>
    </>
  );
}

