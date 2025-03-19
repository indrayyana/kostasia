import type { Metadata } from 'next';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import ScrollToTop from '@/components/ScrollToTop';
import CallToAction from '@/components/CallToAction';

export const metadata: Metadata = {
  title: 'Kost Klungkung - Kost ASIA',
  description:
    'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Klungkung dengan harga terjangkau',
  keywords:
    'kost asia, kos, kost, info kost, rumah kost, sewa kost, kost terdekat, kost murah, cari kost, klungkung, asia, harian, mingguan, bulanan',
  openGraph: {
    title: 'Kost Klungkung - Kost ASIA',
    description:
      'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Klungkung dengan harga terjangkau',
  },
  other: {
    'place:location:latitude': '-8.518713',
    'place:location:longitude': '115.396126',
    'business:contact_data:street_address':
      'Jl. DI Panjaitan, Dusun Gingsir, Desa Akah, Klungkung, Klungkung, Bali 80712',
    'business:contact_data:postal_code': '80712',
    'business:contact_data:locality': 'Klungkung',
    'business:contact_data:phone_number': '+6287762642945',
  },
};

export default function KlungkungLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Kost Klungkung" />
      <main>
        {children}
        <CallToAction />
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}

