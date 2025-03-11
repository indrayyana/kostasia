"use client";

import Link from "next/link";
import Image from "next/image";
import { CabangType } from "@/types/room";
import { useFetchRoomDetail } from "@/hooks/useRoom";
import Loader from "./common/Loader";
import { notFound } from "next/navigation";

interface RoomDetailProps {
  id: string;
  cabang: CabangType;
}

export default function RoomDetail({ id, cabang }: RoomDetailProps) {
  const { data, isPending, isError } = useFetchRoomDetail(cabang, id);

  if (isPending) {
    return <Loader />;
  }

  if (!data) {
    notFound();
  }

  const room = data.kamar || {};

  return (
    <>
      <main>
        {isError ? (
          <p className="text-red-500 text-center">Terjadi kesalahan saat menampilkan data</p>
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
              <h2 className="text-2xl font-bold my-4">Kamar {Number(id) - 10}</h2>
            ) : (
              <h2 className="text-2xl font-bold my-4">Kamar {id}</h2>
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
            <Link
              href={`/booking/${room.cabang}/${room.kamar_id}`}
              type="button"
              title="Ajukan Sewa"
              className="mt-4 max-w-md mx-auto text-white bg-purple-600 font-bold border-2 border-black shadow-solid-sm hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-7 py-3 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Ajukan Sewa
            </Link>
          </section>
        )}
      </main>
    </>
  );
}
