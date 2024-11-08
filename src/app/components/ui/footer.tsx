import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full pt-10 pb-24 flex flex-col">
      <p className="text-lg dark:text-white text-center">
        © 2024 All Rights Reserved. Code by{' '}
        <Link href={'https://github.com/indrayyana'} className="text-red-700">
          Indra
        </Link>{' '}
        & Design by <span className="text-blue-700">Andika</span> - AS
        <span className="text-red-700">I</span>
        <span className="text-blue-700">A</span> Family
      </p>
    </footer>
  );
}

