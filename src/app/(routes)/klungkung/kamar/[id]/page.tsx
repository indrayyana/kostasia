import type { Metadata } from 'next';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { RoomDetailParams } from '@/types/room';
import RoomDetail from '@/components/RoomDetail';

export const metadata: Metadata = {
  title: 'Kost ASIA - Klungkung',
  description:
    'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Klungkung dengan harga terjangkau',
  keywords:
    'kost asia, kos, kost, info kost, rumah kost, sewa kost, kost terdekat, kost murah, cari kost, klungkung, asia, harian, mingguan, bulanan',
  openGraph: {
    title: 'Kost ASIA - Klungkung',
    description:
      'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Klungkung dengan harga terjangkau',
  },
};

export default function KlungkungRoomDetail({ params }: RoomDetailParams) {
  return (
    <>
      <Header />
      <RoomDetail id={params.id} cabang="klungkung" />
      <Footer />
    </>
  );
}

