import { Suspense } from 'react';
import Navbar from '@/components/Navbar';

export default function Header() {
  return (
    <header>
      <h1 className="pt-25 text-4xl text-center font-bold dark:text-white">
        Kost ASIA
      </h1>
      <Suspense>
        <Navbar />
      </Suspense>
    </header>
  );
}

