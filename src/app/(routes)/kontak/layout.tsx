import type { Metadata } from 'next';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Kontak Kami - Kost ASIA',
  description: 'Kami akan menjawab semua pertanyaan anda terkait Kost ASIA.',
  keywords: 'telepon, email, kontak, kost asia',
  openGraph: {
    title: 'Kontak Kami - Kost ASIA',
    description: 'Kami akan menjawab semua pertanyaan anda terkait Kost ASIA.',
  },
};

export default function KontakLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Kontak Kami" />
      <main className="bg-gray-100 dark:bg-slate-800 p-10 sm:p-20">
        {children}
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}

