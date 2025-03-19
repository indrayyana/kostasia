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

export default function Header({ title }: { title?: string }) {
  return (
    <header>
      <Suspense>
        <Navbar />
      </Suspense>
      {title && (
        <div
          className="pb-12 relative w-full h-60 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end text-white"
          style={{ backgroundImage: "url('/assets/breadcrumb-bg.webp')" }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
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

