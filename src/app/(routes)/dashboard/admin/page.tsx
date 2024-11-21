import type { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import ECommerce from '@/components/Dashboard/E-commerce';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function Dashboard() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}

