import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './components/Provider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kost ASIA',
  description:
    'Menyediakan kamar kos-kosan untuk sewa harian, mingguan, dan bulanan di Kota Klungkung dengan harga terjangkau',
  keywords: 'kos, kost, klungkung, asia, semarapura, harian, mingguan, bulanan',
  verification: {
    google: 'Txlx0FGJL3xU51CQE1kupCKkO7XTkBCaLmWROKbjLEw',
  },
  openGraph: {
    title: 'Kost ASIA',
    description:
      'Menyediakan kamar kos-kosan untuk sewa harian, mingguan, dan bulanan di Kota Klungkung dengan harga terjangkau',
    type: 'website',
    url: `${process.env.BASE_URL}`,
    siteName: 'Kost ASIA',
    // images: [
    //   {
    //     url: `${process.env.BASE_URL}/api/og`,
    //   },
    // ]
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

