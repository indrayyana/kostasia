import { RoomDetailParams } from '@/types/room';
import RoomDetail from '@/components/RoomDetail';
import Footer from '@/components/ui/footer';

export default function DenpasarRoomDetail({ params }: RoomDetailParams) {
  return (
    <>
      <RoomDetail id={params.id} cabang="denpasar" />
      <Footer />
    </>
  );
}

