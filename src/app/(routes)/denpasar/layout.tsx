import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kost Denpasar - Kost ASIA',
  description:
    'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Denpasar dengan harga terjangkau',
  keywords:
    'kost asia, kos, kost, info kost, rumah kost, sewa kost, kost terdekat, kost murah, cari kost, denpasar, asia, harian, mingguan, bulanan',
  openGraph: {
    title: 'Kost Denpasar - Kost ASIA',
    description:
      'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Denpasar dengan harga terjangkau',
    images: [
      {
        url: `${process.env.BASE_URL}/assets/opengraph/opengraph-denpasar.png`,
        type: 'image/png',
      },
    ],
  },
  other: {
    'place:location:latitude': '-8.676971',
    'place:location:longitude': '115.224657',
    'business:contact_data:street_address':
      'Gg. XVII A, Jl. Waturenggong, Panjer, Denpasar Selatan, Kota Denpasar, Bali 80234',
    'business:contact_data:postal_code': '80234',
    'business:contact_data:locality': 'Denpasar',
    'business:contact_data:phone_number': '+6281338516406',
  },
};

export default function DenpasarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

