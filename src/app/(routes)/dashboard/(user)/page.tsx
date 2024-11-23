import type { Metadata } from 'next';
import UserLayout from '@/components/Layouts/UserLayout';

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
    <UserLayout>
      <p>test</p>
    </UserLayout>
  );
}

