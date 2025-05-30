import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Providers } from '@/components/Provider';
import AOSInit from '@/lib/aos';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  themeColor: '#4285f4',
  width: 'device-width',
  initialScale: 1.0,
  minimumScale: 1.0,
};

export const metadata: Metadata = {
  applicationName: 'Kost ASIA',
  title: 'Kost ASIA',
  description:
    'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Denpasar dan Klungkung dengan harga terjangkau',
  keywords:
    'kost asia, kos, kost, info kost, rumah kost, sewa kost, kost terdekat, kost murah, cari kost, klungkung, denpasar, asia, semarapura, harian, mingguan, bulanan',
  // verification: {
  //   google: 'Txlx0FGJL3xU51CQE1kupCKkO7XTkBCaLmWROKbjLEw',
  // },
  alternates: {
    canonical: `${process.env.BASE_URL}`,
  },
  openGraph: {
    title: 'Kost ASIA',
    description:
      'Menyediakan kamar kost-kostan untuk sewa harian, mingguan, dan bulanan di Kota Denpasar dan Klungkung dengan harga terjangkau',
    type: 'website',
    url: `${process.env.BASE_URL}`,
    siteName: 'Kost ASIA',
    images: [
      {
        url: `${process.env.BASE_URL}/opengraph-image.png`,
      },
    ],
    locale: 'in_ID',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  authors: [{ name: 'Indra Adnyana', url: 'https://github.com/indrayyana' }],
  classification:
    'Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian',
  other: {
    'mobile-web-app-capable': 'yes',
    'revisit-after': '2 days',
    'place:location:latitude': '-8.518713',
    'place:location:longitude': '115.396126',
    'business:contact_data:website': `${process.env.BASE_URL}`,
    'business:contact_data:street_address':
      'Jl. DI Panjaitan, Dusun Gingsir, Desa Akah, Klungkung, Klungkung, Bali 80712',
    'business:contact_data:postal_code': '80712',
    'business:contact_data:locality': 'Klungkung',
    'business:contact_data:region': 'Bali',
    'business:contact_data:country_name': 'Indonesia',
    'business:contact_data:email': 'info@kostasia.com',
    'business:contact_data:phone_number': '+6287762642945',
    'reply-to': 'info@kostasia.com',
    rating: 'General',
    locale: 'in_ID',
    keyphrases:
      'Info Kost, Cari Kost, Sewa Kost, Kost Murah, Aplikasi Kost, Aplikasi Info Kost, Kost, Kost ASIA, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.className} bg-white dark:bg-slate-800`}>
        <AOSInit />
        <Toaster position="top-center" />
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
