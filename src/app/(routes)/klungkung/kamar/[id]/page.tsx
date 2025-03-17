import { RoomDetailParams } from '@/types/room';
import RoomDetail from '@/components/RoomDetail';

export default function KlungkungRoomDetail({ params }: RoomDetailParams) {
  return (
    <>
      <RoomDetail id={params.id} cabang="klungkung" />
    </>
  );
}

