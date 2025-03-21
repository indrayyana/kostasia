'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import toast from 'react-hot-toast';
import { CabangType } from '@/types/room';
import { useFetchRoomDetail } from '@/hooks/useRoom';
import Loader from './common/Loader';
import { Button } from './ui/button';
import { useCreateTransaction } from '@/hooks/useTransaction';
import { useFetchUserProfile } from '@/hooks/useUser';
import { isBrowser } from '@/utils/browser';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    snap: any;
  }
}

interface RoomCheckoutProps {
  id: string;
  cabang: CabangType;
}

export default function RoomCheckout({ id, cabang }: RoomCheckoutProps) {
  const { data, isPending, isError } = useFetchRoomDetail(cabang, id);
  const { data: userData, isPending: userPending } = useFetchUserProfile();
  const { mutate: createTransaction } = useCreateTransaction();

  if (isPending || userPending) {
    return <Loader />;
  }

  if (!data) {
    notFound();
  }

  const room = data.kamar || {};

  const handleCheckout = async () => {
    const payload = {
      user: {
        id: userData?.user?.user_id,
        fullname: userData?.user?.nama,
        email: userData?.user?.email,
        phone: userData?.user?.telepon,
      },
      transaction: {
        room: room.kamar_id,
        total: 500000,
      },
    };

    // @ts-expect-error off
    createTransaction(payload, {
      onSuccess: (response) => {
        if (response?.data?.transaction?.token) {
          const transaction_token = response?.data.transaction.token;
          if (!isBrowser()) return;
          window.snap.pay(transaction_token);
        } else {
          console.error('Transaction token not found');
        }
      },
      onError: (error) => {
        console.log(error);
        toast.error('Terjadi kesalahan saat pembayaran');
      },
    });
  };

  return (
    <>
      <main>
        {isError ? (
          <p className="text-red-500 text-center">
            Terjadi kesalahan saat menampilkan data
          </p>
        ) : (
          <section
            id="tentang"
            className="w-full p-12 mt-12 text-white flex flex-col bg-blue-600 border-4 border-black"
          >
            {room && (
              <Image
                src={room.gambar}
                alt={room.nama}
                title="Foto Kamar"
                width={400}
                height={400}
                priority
                className="border-4 border-black object-cover object-top aspect-[1.48/1]"
              />
            )}
            {Number(id) > 10 ? (
              <p className="text-2xl font-bold my-4">Kamar {Number(id) - 10}</p>
            ) : (
              <p className="text-2xl font-bold my-4">Kamar {id}</p>
            )}
            <p className="font-bold my-4">Spesifikasi Tipe Kamar</p>
            <ul className="list-disc">
              <li>3 x 4 meter</li>
              <li>Listrik token</li>
              <li>Sumur bor</li>
            </ul>
            <p className="font-bold my-4">Fasilitas Pilihan</p>
            <ul className="list-disc">
              <li>Kasur</li>
              <li>Lemari pakaian</li>
              <li>Kamar mandi dalam</li>
            </ul>
            <Button
              onClick={() => handleCheckout()}
              title="Tombol Bayar Sewa"
              className="mt-4 max-w-md mx-auto text-white bg-purple-600 font-bold border-2 border-black shadow-solid-sm hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-3 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Bayar Sewa
            </Button>
          </section>
        )}
      </main>
    </>
  );
}
