import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi - Kost ASIA',
  description: 'Kebijakan privasi tentang Website Kost ASIA',
  keywords: 'kebijakan privasi, rahasia, informasi, sewa kost, denpasar, klungkung',
  openGraph: {
    title: 'Kebijakan Privasi - Kost ASIA',
    description: 'Kebijakan privasi tentang Website Kost ASIA',
  },
};

export default function KebijakanPrivasi() {
  return (
    <>
      <Header title="Kebijakan Privasi" />
      <main>
        <section className="p-12 bg-gray-100 dark:bg-slate-800">
          <div className="w-full max-w-4xl mx-auto text-justify bg-white dark:bg-gray-900 rounded-lg shadow-lg border p-15">
            <p className="text-2xl font-bold mb-6">Kebijakan Privasi Kost ASIA</p>
            <div className="flex flex-col gap-4">
              <p>Selamat datang di Kost ASIA!</p>
              <p>
                Kami berkomitmen untuk melindungi dan menjaga privasi data pribadi Anda. Kebijakan Privasi ini
                menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda
                menggunakan layanan kami.
              </p>

              <b>1. Informasi yang Kami Kumpulkan</b>
              <p>Saat Anda menggunakan website Kost ASIA, kami dapat mengumpulkan beberapa informasi berikut:</p>
              <ul className="list-disc ml-8">
                <li>
                  Data Akun Google: Saat Anda mendaftar atau login menggunakan akun Google (Google OAuth), kami
                  mengakses informasi dasar seperti nama, alamat email, dan foto profil Anda.
                </li>
                <li>
                  Data Identitas: Kami meminta Anda untuk mengunggah foto KTP (Kartu Tanda Penduduk) sebagai verifikasi
                  identitas untuk keperluan penyewaan kamar kost.
                </li>
                <li>
                  Data Pembayaran: Pembayaran dilakukan melalui pihak ketiga, yaitu Midtrans. Kami tidak menyimpan data
                  kartu kredit atau data pembayaran Anda di server kami. Semua transaksi diproses secara aman oleh
                  Midtrans.
                </li>
                <li>
                  Data Lokasi dan Preferensi: Kami dapat mengumpulkan informasi terkait lokasi Anda dan preferensi
                  cabang kost (Klungkung atau Denpasar) untuk memberikan layanan terbaik.
                </li>
              </ul>
              <b>2. Penggunaan Informasi</b>
              <p>Informasi yang kami kumpulkan digunakan untuk:</p>
              <ul className="list-disc ml-8">
                <li>Memverifikasi identitas penyewa.</li>
                <li>Mengelola proses reservasi dan pembayaran kost.</li>
                <li>Memberikan pengalaman pengguna yang aman dan personal.</li>
                <li>Menghubungi Anda terkait informasi reservasi atau update layanan.</li>
                <li>Mematuhi kewajiban hukum yang berlaku.</li>
              </ul>
              <b>3. Perlindungan Data</b>
              <p>
                Kami menjaga keamanan informasi pribadi Anda dengan berbagai langkah teknis dan organisasi, termasuk:
              </p>
              <ul className="list-disc ml-8">
                <li>Menggunakan protokol keamanan (HTTPS) di website kami.</li>
                <li>Menyimpan data hanya pada server terpercaya dan terenkripsi.</li>
                <li>Membatasi akses informasi hanya kepada pihak yang berkepentingan.</li>
              </ul>
              <b>4. Berbagi Informasi</b>
              <p>
                Kami tidak menjual, menyewakan, atau menukar informasi pribadi Anda kepada pihak ketiga manapun.
                Informasi Anda hanya dapat dibagikan dengan:
              </p>
              <ul className="list-disc ml-8">
                <li>Midtrans, untuk memproses pembayaran.</li>
                <li>Pihak berwenang, jika diwajibkan oleh hukum.</li>
              </ul>
              <b>5. Hak Anda</b>
              <p>Sebagai pengguna, Anda memiliki hak untuk:</p>
              <ul className="list-disc ml-8">
                <li>Mengakses dan memperbarui informasi pribadi Anda.</li>
                <li>Meminta penghapusan akun dan data pribadi Anda dari sistem kami.</li>
                <li>
                  Menarik kembali persetujuan atas penggunaan data tertentu (dengan konsekuensi penghentian layanan).
                </li>
              </ul>
              <b>6. Perubahan Kebijakan Privasi</b>
              <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.</p>
              <p>Perubahan signifikan akan kami informasikan melalui website atau email.</p>
              <p>Tanggal terakhir diperbarui: 5 April 2025</p>
              <b>7. Hubungi Kami</b>
              <p>
                Jika Anda memiliki pertanyaan atau permintaan terkait Kebijakan Privasi ini, silakan hubungi kami{' '}
                <Link className="underline text-primary inline-block" href={'/kontak'} prefetch={false}>
                  di sini.
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

