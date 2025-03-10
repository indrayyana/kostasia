import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { CabangType } from '@/types/room';
import { notFound } from 'next/navigation';
import RoomCheckout from '@/components/RoomCheckout';
import Script from 'next/script';
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
        strategy="lazyOnload"
      />
      <Header />
      <RoomCheckout id={params.kamarId} cabang={params.cabang as CabangType} />
      <Footer />
    </>
  );
}

