import { IconHome, IconDoor, IconBrandWhatsapp } from '@tabler/icons-react';
import Theme from './Theme';
import { FloatingDock } from './ui/floating-dock';

export default function Navbar() {
  const links = [
    {
      title: 'Beranda',
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '/',
    },

    {
      title: 'Kamar',
      icon: (
        <IconDoor className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#kamar',
    },
    {
      title: 'Kontak',
      icon: (
        <IconBrandWhatsapp className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#kontak',
    },
    {
      title: 'Tema',
      icon: <Theme />,
      href: '#',
    },
  ];

  return (
    <nav className="flex items-end fixed z-50 justify-center w-full">
      <FloatingDock items={links} />
    </nav>
  );
}

