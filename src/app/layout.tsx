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
    'Menyediakan kamar kos-kosan harian, mingguan, dan bulanan di Kota Klungkung',
  keywords: 'kos, kost, klungkung, asia, semarapura, harian, mingguan, bulanan',
  verification: {
    google: 'Txlx0FGJL3xU51CQE1kupCKkO7XTkBCaLmWROKbjLEw',
  },
  manifest: '/manifest.json',
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

