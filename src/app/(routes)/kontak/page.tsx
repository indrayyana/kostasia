'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IconBrandWhatsapp, IconMail } from '@tabler/icons-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Kontak() {
  const form = useForm();

  return (
    <>
      <div className="max-w-5xl p-10 bg-white dark:bg-gray-900 rounded-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="">
          <p className="text-3xl font-bold text-blue-700 text-center">
            Hubungi Kami
          </p>
          <Image
            className="w-203 my-20"
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
        <div className="">
          <Form {...form}>
            <div className="flex flex-col items-center gap-8 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Nama" {...field} />
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
                      <Input placeholder="Email" {...field} />
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
                      <Input placeholder="Telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subjek"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Subjek" {...field} />
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
                      <Textarea
                        rows={5}
                        placeholder="Pesan"
                        id="pesan"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full dark:text-white font-bold"
              >
                Kirim Email
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

