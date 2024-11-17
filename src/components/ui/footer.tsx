import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-10 pb-24 flex flex-col">
      <p className="text-lg dark:text-white text-center">
        © {currentYear} All Rights Reserved. Code by{' '}
        <Link
          href={'https://indrayyana.github.io'}
          target="_blank"
          className="text-red-700"
        >
          Indra
        </Link>{' '}
        & Design by <span className="text-blue-700">Andika</span> - AS
        <span className="text-red-700">I</span>
        <span className="text-blue-700">A</span> Family
      </p>
    </footer>
  );
}

