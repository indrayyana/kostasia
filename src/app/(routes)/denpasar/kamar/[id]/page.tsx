import { RoomDetailParams } from '@/types/room';
import RoomDetail from '@/components/RoomDetail';

export default function DenpasarRoomDetail({ params }: RoomDetailParams) {
  return (
    <>
      <RoomDetail id={params.id} cabang="denpasar" />
    </>
  );
}

