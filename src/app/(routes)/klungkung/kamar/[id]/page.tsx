import { RoomDetailParams } from '@/types/room';
import RoomDetail from '@/components/RoomDetail';
import Footer from '@/components/ui/footer';

export default function KlungkungRoomDetail({ params }: RoomDetailParams) {
  return (
    <>
      <RoomDetail id={params.id} cabang="klungkung" />
      <Footer />
    </>
  );
}

