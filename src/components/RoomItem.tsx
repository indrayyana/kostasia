import Link from 'next/link';
import { memo } from 'react';
import Image from 'next/image';
import { RoomInterface } from '@/types/room';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';

interface RoomItemProps {
  room: RoomInterface;
}

const RoomItem = memo(({ room }: RoomItemProps) => {
  const statusStyles = {
    kosong: 'border-green-500 text-green-600',
    terisi: 'border-red-500 text-red-500',
  };

  return (
    <Link href={`/${room.cabang}/kamar/${room.kamar_id}`}>
      <Card className="dark:bg-gray-900">
        <CardHeader className="p-0">
          <Image
            src={room.gambar}
            alt={room.nama}
            title={`Foto ${room.nama}`}
            width={500}
            height={500}
            priority
            className="rounded-t-lg object-cover object-top aspect-[1.40/1] w-full"
          />
        </CardHeader>
        <CardContent>
          <CardDescription>
            <Badge
              variant="outline"
              className={`font-bold text-sm px-2 my-3 capitalize ${
                statusStyles[room.status] || ''
              }`}
            >
              {room.status}
            </Badge>
          </CardDescription>
          <CardTitle>{room.nama}</CardTitle>
          <CardDescription>
            <p>K. Mandi Dalam - Kasur - Lemari</p>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="w-full dark:text-white">Lihat Detail</Button>
        </CardFooter>
      </Card>
    </Link>
  );
});

RoomItem.displayName = 'RoomItem';

export default RoomItem;

