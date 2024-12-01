import Image from 'next/image';
import { Mail, Upload, User } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import UserLayout from '@/components/Layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Profil = () => {
  return (
    <UserLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profil" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Informasi Pribadi
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-2.5">
                          <User size={20} />
                        </span>
                        <Input
                          className="bg-gray pl-11.5 pr-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          id="fullName"
                          name="fullName"
                          placeholder="Putu Gede"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Nomor Telepon
                      </label>
                      <Input
                        className="bg-gray text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="contoh: 08123456789"
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-2.5">
                        <Mail size={20} />
                      </span>
                      <Input
                        className="bg-gray pl-11.5 pr-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        placeholder="tudebagus45@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="KTP"
                    >
                      Kartu Tanda Penduduk (KTP)
                    </label>
                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <Upload size={20} />
                        </span>
                        <p>
                          <span className="text-primary">
                            Klik untuk upload
                          </span>{' '}
                          atau drag & drop
                        </p>
                        <p className="mt-1.5">SVG, PNG, atau JPG</p>
                        <p>(max, 800 X 800px)</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <Button variant={'destructive'}>Batal</Button>
                    <Button className="dark:text-white">Simpan</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Foto Profil
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <Image
                        src={'/images/user/user-03.png'}
                        width={55}
                        height={55}
                        alt="User"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit foto profil
                      </span>
                      <span className="flex gap-2.5">
                        {/* <button className="text-sm hover:text-primary">
                          Hapus
                        </button> */}
                        <Button
                          className="text-red-600 p-0 size-fit"
                          variant={'link'}
                        >
                          Hapus
                        </Button>
                        <Button
                          className="text-yellow-600 p-0 size-fit"
                          variant={'link'}
                        >
                          Update
                        </Button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <Upload size={20} />
                      </span>
                      <p>
                        <span className="text-primary">Klik untuk upload</span>{' '}
                        atau drag & drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, atau JPG</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <Button variant={'destructive'}>Batal</Button>
                    <Button className="dark:text-white">Simpan</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profil;

