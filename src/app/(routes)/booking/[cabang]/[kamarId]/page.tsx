import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { CabangType } from '@/types/room';
import RoomCheckout from '@/components/RoomCheckout';
import { config } from '@/utils/config';

interface BookingProps {
  params: {
    cabang: string;
    kamarId: string;
  };
}

export default function Booking({ params }: BookingProps) {
  const validCabangs: CabangType[] = ['denpasar', 'klungkung'];

  if (!validCabangs.includes(params.cabang as CabangType)) {
    notFound();
  }

  return (
    <>
      <Script
        src={config.midtrans.snapUrl}
        data-client-key={config.midtrans.clientKey}
      />
      <Header />
      <RoomCheckout id={params.kamarId} cabang={params.cabang as CabangType} />
      <Footer />
    </>
  );
}
