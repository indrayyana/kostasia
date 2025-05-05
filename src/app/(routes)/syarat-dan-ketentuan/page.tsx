import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

export const metadata: Metadata = {
  title: 'Syarat Dan Ketentuan - Kost ASIA',
  description: 'Syarat dan ketentuan bagi penyewa Kost ASIA',
  keywords: 'syarat, ketentuan, informasi, sewa kost, denpasar, klungkung',
  openGraph: {
    title: 'Syarat Dan Ketentuan - Kost ASIA',
    description: 'Syarat dan ketentuan bagi penyewa Kost ASIA',
  },
};

export default function SyaratDanKetentuan() {
  return (
    <>
      <Header title="Syarat & Ketentuan" />
      <main>
        <section className="p-12 bg-gray-100 dark:bg-slate-800">
          <div className="w-full max-w-4xl mx-auto text-justify bg-white dark:bg-gray-900 rounded-lg shadow-lg border p-15">
            <p className="text-2xl font-bold mb-6">Syarat dan Ketentuan Kost ASIA</p>
            <div className="flex flex-col gap-4">
              <p>Selamat datang di Kost ASIA!</p>
              <p>
                Dengan menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui Syarat dan
                Ketentuan berikut.
              </p>

              <b>1. Definisi</b>
              <ul className="list-disc ml-8">
                <li>
                  Kost ASIA: Platform website untuk reservasi dan pembayaran sewa kost di cabang Klungkung dan Denpasar.
                </li>
                <li>Pengguna: Setiap individu yang mengakses atau menggunakan layanan Kost ASIA.</li>
              </ul>

              <b>2. Akun Pengguna</b>
              <ul className="list-disc ml-8">
                <li>
                  Untuk menggunakan layanan kami, Anda wajib login menggunakan akun Google melalui sistem Google OAuth.
                </li>
                <li>Informasi akun yang Anda berikan harus akurat, lengkap, dan terbaru.</li>
              </ul>

              <b>3. Verifikasi Identitas</b>
              <ul className="list-disc ml-8">
                <li>
                  Demi keamanan dan kenyamanan bersama, pengguna diwajibkan untuk mengunggah foto KTP (Kartu Tanda
                  Penduduk) yang valid sebagai bukti identitas sebelum dapat melakukan reservasi kost.
                </li>
              </ul>

              <b>4. Reservasi dan Pembayaran</b>
              <ul className="list-disc ml-8">
                <li>Reservasi kamar kost dilakukan melalui website.</li>
                <li>Semua pembayaran diproses menggunakan payment gateway Midtrans.</li>
                <li>
                  Biaya reservasi dan pembayaran yang telah dilakukan tidak dapat dikembalikan, kecuali terdapat
                  kesalahan dari pihak Kost ASIA.
                </li>
                <li>
                  Harga sewa dapat berubah sewaktu-waktu, namun perubahan harga tidak berlaku untuk reservasi yang sudah
                  dikonfirmasi.
                </li>
              </ul>
              <b>5. Kewajiban Pengguna</b>
              <p>Pengguna wajib:</p>
              <ul className="list-disc ml-8">
                <li>Memberikan informasi yang benar saat pendaftaran dan reservasi.</li>
                <li>Menggunakan layanan Kost ASIA sesuai dengan hukum dan etika yang berlaku.</li>
                <li>Menjaga keamanan akun masing-masing dan tidak membagikan kredensial kepada pihak lain.</li>
              </ul>

              <b>6. Larangan</b>
              <p>Pengguna dilarang:</p>
              <ul className="list-disc ml-8">
                <li>Mengunggah dokumen identitas palsu.</li>
                <li>Melakukan aktivitas yang dapat merusak, mengganggu, atau membebani operasional website.</li>
                <li>Menggunakan layanan untuk tujuan yang melanggar hukum.</li>
              </ul>

              <b>7. Hak Kost ASIA</b>
              <p>Kami berhak untuk:</p>
              <ul className="list-disc ml-8">
                <li>Menolak atau membatalkan reservasi jika ditemukan pelanggaran terhadap syarat dan ketentuan.</li>
                <li>Menghapus atau menangguhkan akun pengguna yang melanggar aturan.</li>
                <li>
                  Melakukan perubahan pada layanan, fitur, harga, maupun kebijakan sewaktu-waktu, dengan atau tanpa
                  pemberitahuan terlebih dahulu.
                </li>
              </ul>

              <b>8. Batasan Tanggung Jawab</b>
              <ul className="list-disc ml-8">
                <li>
                  Kost ASIA tidak bertanggung jawab atas kerugian atau kerusakan yang timbul akibat penggunaan website
                  kami di luar kendali yang wajar.
                </li>
                <li>
                  Semua transaksi pembayaran dilakukan melalui Midtrans; segala masalah transaksi akan ditangani sesuai
                  kebijakan Midtrans.
                </li>
              </ul>

              <b>9. Penyelesaian Sengketa</b>
              <p>
                Setiap sengketa yang timbul terkait penggunaan layanan Kost ASIA akan diselesaikan secara musyawarah.
                Jika tidak tercapai kesepakatan, sengketa akan diselesaikan sesuai hukum yang berlaku di Republik
                Indonesia.
              </p>

              <b>10. Perubahan Syarat dan Ketentuan</b>
              <p>
                Syarat dan Ketentuan ini dapat diperbarui dari waktu ke waktu. Pengguna disarankan untuk memeriksa
                halaman ini secara berkala.
              </p>

              <p>Tanggal terakhir diperbarui: 5 April 2025</p>

              <b>11. Kontak</b>
              <p>
                Untuk pertanyaan terkait Syarat dan Ketentuan ini, Anda dapat menghubungi kami{' '}
                <Link className="underline text-primary" href={'/kontak'} prefetch={false}>
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

