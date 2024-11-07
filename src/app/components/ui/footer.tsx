import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full pt-10 pb-32 flex flex-col">
      <p className="text-lg text-gray-700 dark:text-white text-center">
        © 2024 All Rights Reserved. Code by{' '}
        <Link href={'https://github.com/indrayyana'} className="text-red-600">
          Indra
        </Link>{' '}
        & Design by <span className="text-blue-600">Andika</span> - AS
        <span className="text-red-600">I</span>
        <span className="text-blue-600">A</span> Family
      </p>
    </footer>
  );
}

