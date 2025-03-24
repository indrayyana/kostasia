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
    kosong: 'bg-green-100 text-green-800',
    terisi: 'bg-red-100 text-red-800',
  };

  return (
    <Link href={`/${room.cabang}/kamar/${room.kamar_id}`}>
      <Card className="dark:bg-slate-800 dark:border-slate-900 max-w-lg">
        <CardHeader className="p-0">
          <Image
            src={room.gambar}
            alt={room.nama}
            title={`Foto ${room.nama}`}
            width={500}
            height={500}
            className="rounded-t-lg object-cover object-top aspect-[1.40/1] w-full max-w-lg"
          />
        </CardHeader>
        <CardContent>
          <CardDescription>
            <Badge
              variant="custom"
              className={`${statusStyles[room.status] || ''}`}
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

