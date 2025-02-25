'use client';

import { notFound } from 'next/navigation';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { RoomDetailParams } from '@/types/room';
import Loader from '@/components/common/Loader';
import { useFetchRoomDetail } from '@/hooks/useRoom';
import RoomDetail from '@/components/RoomDetail';

export default function DenpasarRoomDetail({ params }: RoomDetailParams) {
  const { data, isPending, isError } = useFetchRoomDetail(
    'denpasar',
    params.id
  );

  if (isPending) {
    return <Loader />;
  }

  if (!data) {
    notFound();
  }

  const room = data.kamar || {};

  return (
    <>
      <Header />
      <RoomDetail id={params.id} room={room} isError={isError} />
      <Footer />
    </>
  );
}

