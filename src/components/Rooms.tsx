import { RoomInterface } from '@/types/room';
import RoomItem from './RoomItem';

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
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          rooms.length === 6 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
        } gap-5 sm:gap-6 lg:gap-8`}
      >
        {rooms.map((room: RoomInterface) => (
          <RoomItem key={room.kamar_id} room={room} />
        ))}
      </div>
    </>
  );
}

