import Image from 'next/image';
import { Product, WithContext } from 'schema-dts';
import { RoomType } from '@/app/types/room';

async function getRooms() {
  const res = await fetch(`${process.env.API_URL}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Rooms() {
  const rooms = await getRooms();

  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: rooms.name,
    image: rooms.image,
    description: rooms.info,
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {rooms.data.map((room: RoomType) => (
          <div
            key={room.id}
            className="text-center bg-blue-500 text-black p-4 border-4 border-black shadow-solid"
          >
            <Image
              src={room.image}
              alt={room.name}
              width={500}
              height={500}
              priority
              className="border-4 border-black object-cover object-top aspect-[1.48/1] w-full"
            />
            <h3 className="mt-6 text-black font-semibold mb-2 text-3xl">
              {room.name}
            </h3>
            {room.info === 'Kosong' ? (
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
                  {room.info}
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
                  {room.info}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

