import type { Metadata } from 'next';

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

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

