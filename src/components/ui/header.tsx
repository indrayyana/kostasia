import { Suspense } from 'react';
import { Slash } from 'lucide-react';
import Navbar from '@/components/Navbar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  title?: string;
  title2?: string;
}

export default function Header({ title, title2 }: HeaderProps) {
  if (!!title2) {
    return (
      <header>
        <Suspense>
          <Navbar />
        </Suspense>
        {title && (
          <div className="pb-12 relative w-full h-60 flex flex-col items-center justify-end text-white overflow-hidden">
            <Image
              src="/assets/breadcrumb-bg.webp"
              alt="Breadcrumb Background"
              fill={true}
              priority={true}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/90"></div>
            <h1 className="text-4xl text-center font-bold text-white relative z-10">
              {title}
            </h1>
            <Breadcrumb className="mt-4 relative z-10">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link className="text-white" href="/">
                      Beranda
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash className="text-white" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      className="text-white"
                      href={`/${title
                        .replace('Kost', '')
                        .toLowerCase()
                        .trim()}`}
                    >
                      {title.replace('Kost', '')}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash className="text-white" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    {title2}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
      </header>
    );
  }

  return (
    <header>
      <Suspense>
        <Navbar />
      </Suspense>
      {title && (
        <div className="pb-12 relative w-full h-60 flex flex-col items-center justify-end text-white overflow-hidden">
          <Image
            src="/assets/breadcrumb-bg.webp"
            alt="Breadcrumb Background"
            fill={true}
            priority={true}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/90"></div>
          <h1 className="text-4xl text-center font-bold text-white relative z-10">
            {title}
          </h1>
          <Breadcrumb className="mt-4 relative z-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-white" href="/">
                    Beranda
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash className="text-white" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {title.replace('Kost', '')}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
    </header>
  );
}

