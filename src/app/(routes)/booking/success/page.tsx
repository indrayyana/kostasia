'use client';

import { Suspense, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { useUpdateTransaction } from '@/hooks/useTransaction';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const { mutate, isError } = useUpdateTransaction();

  useEffect(() => {
    if (!!orderId) {
      mutate(orderId);
    }
  }, [orderId, mutate]);

  return (
    <>
      <main>
        {isError ? (
          <div className="flex flex-col items-center justify-center h-[50vh] ">
            <p>Terjadi Kesalahan, Coba lagi nanti</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] ">
            <Image
              className="mt-10"
              src={'/assets/payment-success.svg'}
              title="Gambar pembayaran berhasil"
              alt="Gambar pembayaran berhasil"
              width={200}
              height={200}
              priority
            />
            <p className="text-2xl font-bold mt-2 mb-10">Pembayaran Berhasil</p>
            <Button type="button">Cek Detail Transaksi</Button>
          </div>
        )}
      </main>
    </>
  );
}

export default function Success() {
  return (
    <>
      <Header />
      <Suspense>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}

