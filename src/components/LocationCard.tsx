import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface LocationCardProps {
  name: string;
  route: string;
  imageUrl: string;
  aosAnimate: string;
}

export default function LocationCard({
  name,
  route,
  imageUrl,
  aosAnimate,
}: LocationCardProps) {
  return (
    <Link href={route} data-aos={`${aosAnimate}`}>
      <Card className="relative overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="relative w-full">
            <Image
              src={imageUrl}
              alt={`Foto kota ${name}`}
              title={`Foto kota ${name}`}
              width={500}
              height={500}
              priority
              className="rounded-t-lg object-cover object-top transition-opacity duration-500 aspect-[1.40/1] w-full"
            />
            <div className="absolute inset-0 bg-black/65"></div>
            <CardTitle className="absolute inset-0 flex items-center justify-center xsm:text-4xl sm:text-2xl text-white text-2xl md:text-4xl lg:text-5xl font-semibold">
              {name}
            </CardTitle>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

