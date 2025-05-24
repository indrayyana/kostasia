'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IconBrandWhatsapp, IconMail } from '@tabler/icons-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Kontak() {
  const sendMessageBody = z
    .object({
      nama: z.string().min(1, 'Nama tidak boleh kosong').max(20).optional(),
      email: z.string().min(1, 'Email tidak boleh kosong').email().max(64).optional(),
      telepon: z.string().min(1, 'Telepon tidak boleh kosong').max(20).optional(),
      pesan: z.string().min(1, 'Pesan tidak boleh kosong').max(20).optional(),
    })
    .strict();

  const form = useForm<z.infer<typeof sendMessageBody>>({
    resolver: zodResolver(sendMessageBody),
    defaultValues: {
      nama: '',
      email: '',
      telepon: '',
      pesan: '',
    },
  });

  const onSubmit = (values: z.infer<typeof sendMessageBody>) => {
    const message = `Nama: ${values.nama || '-'}%0AEmail: ${values.email || '-'}%0ATelepon: ${
      values.telepon || '-'
    }%0A${values.pesan || '-'}`;

    const whatsappURL = `https://wa.me/6287762642945?text=${message}`;

    window.open(whatsappURL, '_blank');

    form.reset();
  };

  return (
    <>
      <section className="max-w-5xl p-10 bg-white dark:bg-gray-900 rounded-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <p className="text-3xl font-bold text-blue-700 text-center">Hubungi Kami</p>
          <Image
            className="w-203 my-13"
            src={'/assets/contact-us.svg'}
            title="Ilustrasi kontak kami"
            alt="Ilustrasi kontak kami"
            width={200}
            height={200}
            priority
          />
          <div className="flex flex-col gap-2">
            <li className="flex items-center gap-4">
              <IconBrandWhatsapp size={30} className="text-blue-700" />
              <Link
                href="https://wa.me/6287762642945?text=Halo Bu, saya mau pesan kamar kost an"
                target="_blank"
                className="hover:underline"
              >
                087762642945
              </Link>
            </li>
            <li className="flex items-center gap-4">
              <IconMail size={30} className="text-blue-700" />

              <Link href="mailto:info@kostasia.com" className="hover:underline">
                info@kostasia.com
              </Link>
            </li>
          </div>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center gap-8 w-full">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input id="nama" placeholder="Nama" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input id="email" type="email" placeholder="Email" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telepon"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input id="telepon" type="number" placeholder="Telepon" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pesan"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea rows={5} placeholder="Pesan" id="pesan" autoComplete="off" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full dark:text-white font-bold">
                  Kirim Pesan
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}

