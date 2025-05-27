'use client';

import * as React from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Download, FileDown, FileSpreadsheet, FileText, Loader2, Plus, Trash2 } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import TableSearch from '@/components/ui/table-search';
import { useBulkDeleteUsers, useCreateUser, useUploadKtp, useUploadProfile } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';
import TablePagination from '@/components/ui/table-pagination';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { createUserBody } from '@/validations/user';

interface DataTableProps<TData extends { user_id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  refetch: () => void;
}

export function DataTable<TData extends { user_id: string }, TValue>({
  columns,
  data = [],
  isLoading,
  refetch,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [previewProfile, setPreviewProfile] = React.useState<string | null>(null);
  const [previewKtp, setPreviewKtp] = React.useState<string | null>(null);
  const [imageProfile, setImageProfile] = React.useState<File | null>(null);
  const [fotoKtp, setFotoKtp] = React.useState<File | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;

  const { mutate: bulkDeleteUser, isPending: bulkDeleteUserIsLoading } = useBulkDeleteUsers({
    onSuccess: () => {
      refetch();
      setRowSelection({});
      setIsOpen(false);
      toast.success('User berhasil dihapus', { duration: 3000 });
    },
    onError: () => {
      toast.error('Terjadi kesalahan saat menghapus user', { duration: 3000 });
    },
  });

  const handleDelete = () => {
    const ids = selectedRows.map((row) => row.original.user_id);
    bulkDeleteUser({ id: ids });
  };

  const { mutate: uploadProfile, isPending: uploadProfileIsLoading } = useUploadProfile({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message
          : 'Terjadi kesalahan saat mengupload foto profil';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const { mutate: uploadKtp, isPending: uploadKtpIsLoading } = useUploadKtp({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message
          : 'Terjadi kesalahan saat mengupload foto KTP';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const { mutate: createUser, isPending: createUserIsLoading } = useCreateUser({
    onSuccess: async () => {
      form.reset();
      toast.success('Berhasil menambahkan user baru', { duration: 3000 });
      refetch();
      setOpen(false);
      setPreviewKtp(null);
      setPreviewProfile(null);
    },
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message || error.response?.data?.message
          : 'Terjadi kesalahan saat menambahkan user';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const form = useForm<z.infer<typeof createUserBody>>({
    resolver: zodResolver(createUserBody),
    defaultValues: {
      user_id: '',
      nama: '',
      email: '',
      telepon: '',
      gender: undefined,
      role: undefined,
      foto: undefined,
      ktp: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserBody>) => {
    try {
      const userId = uuidv4();

      await new Promise<void>((resolve, reject) => {
        createUser(
          {
            user_id: userId,
            nama: values.nama,
            email: values.email,
            telepon: values.telepon,
            gender: values.gender,
            role: values.role,
            ...(imageProfile && { foto: values.foto }),
            ...(fotoKtp && { ktp: values.ktp }),
          },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          }
        );
      });

      if (imageProfile) {
        uploadProfile({
          param: { userId: userId },
          body: { file: imageProfile },
        });
      }

      if (fotoKtp) {
        uploadKtp({
          param: { userId: userId },
          body: { file: fotoKtp },
        });
      }
    } catch (error) {
      console.error('Create User Failed:', error);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageProfile(file);
      setPreviewProfile(URL.createObjectURL(file));
    }
  };

  const handleKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoKtp(file);
      setPreviewKtp(URL.createObjectURL(file));
    }
  };

  const fileDownload = (format: string) => {
    alert(`Download file ${format} berhasil`);
  };

  return (
    <>
      <div className="flex gap-2 justify-between">
        <TableSearch table={table} />

        <div className="flex items-center dark:text-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'} className="font-bold mr-2">
                <Download />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Format</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => fileDownload('pdf')}>
                <FileText className="mr-2 h-4 w-4" />
                File .pdf
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileDownload('xlsx')}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                File .xlsx
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileDownload('csv')}>
                <FileDown className="mr-2 h-4 w-4" />
                File .csv
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog
            open={open}
            onOpenChange={(open) => {
              if (!open) {
                form.reset();
              }
              setOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <Button size={'sm'} className="dark:text-white font-bold">
                <Plus />
                Tambah
              </Button>
            </DialogTrigger>
            <DialogContent className="xsm:max-w-100 max-h-115 text-black-2 dark:text-white overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Tambah User Baru</DialogTitle>
                <DialogDescription>
                  Tambahkan data user baru. Klik simpan jika sudah selesai memasukkan data.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-5 pb-8">
                    {!!previewProfile && (
                      <Image
                        src={previewProfile}
                        alt="foto profile"
                        width={20}
                        height={20}
                        className="w-auto h-30 mx-auto"
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="foto"
                      render={() => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Foto Profil (PNG/JPG)</FormLabel>
                          <FormControl>
                            <Input id="foto" type="file" accept="image/*" onChange={handleProfileChange} />
                          </FormControl>
                          <FormDescription>Maksimal ukuran file 3MB</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nama"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Nama<sup className="text-red-600 dark:text-red-400">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Input id="nama" placeholder="Nama" autoComplete="off" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Email<sup className="text-red-600 dark:text-red-400">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Input id="email" type="email" placeholder="Email" autoComplete="off" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telepon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Telepon<sup className="text-red-600 dark:text-red-400">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Input id="telepon" type="number" placeholder="Telepon" autoComplete="off" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Jenis Kelamin<sup className="text-red-600 dark:text-red-400">*</sup>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih jenis kelamin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="laki_laki">{'Laki-laki'}</SelectItem>
                              <SelectItem value="perempuan">{'Perempuan'}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Role<sup className="text-red-600 dark:text-red-400">*</sup>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pengunjung">{'Pengunjung'}</SelectItem>
                              <SelectItem value="penyewa">{'Penyewa'}</SelectItem>
                              <SelectItem value="admin">{'Admin'}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ktp"
                      render={() => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Foto KTP (PNG/JPG)</FormLabel>
                          <FormControl>
                            <Input id="ktp" type="file" accept="image/*" onChange={handleKtpChange} />
                          </FormControl>
                          <FormDescription>Maksimal ukuran file 3MB</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {!!previewKtp && (
                      <Image
                        src={previewKtp}
                        alt="foto profile"
                        width={20}
                        height={20}
                        className="w-auto h-30 mx-auto"
                      />
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="dark:text-white font-bold"
                      disabled={createUserIsLoading || uploadProfileIsLoading || uploadKtpIsLoading}
                    >
                      {createUserIsLoading || uploadProfileIsLoading || uploadKtpIsLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="animate-spin" />
                          <span>Loading</span>
                        </div>
                      ) : (
                        'Simpan'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border bg-white mt-5 dark:bg-boxdark dark:text-white dark:border-gray-500">
        <div className="w-full h-9 m-2">
          {selectedRows.length > 0 && (
            <div>
              <Button
                size={'sm'}
                variant="destructive"
                onClick={() => {
                  setIsOpen(true);
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 />
                Hapus
              </Button>
            </div>
          )}
        </div>
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="dark:border-gray-500" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold text-black-2 dark:text-white">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index} className="dark:border-gray-500">
                  <TableCell colSpan={columns.length}>
                    <Skeleton className="h-[40px] w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="dark:border-gray-500" key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Tidak ada hasil.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination table={table} />

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent className="dark:text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda yakin ingin menghapus {table.getFilteredSelectedRowModel().rows.length} data yang dipilih ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={bulkDeleteUserIsLoading}>Batal</AlertDialogCancel>
            <Button variant={'destructive'} onClick={handleDelete} disabled={bulkDeleteUserIsLoading}>
              {bulkDeleteUserIsLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  <span>Loading</span>
                </div>
              ) : (
                'Hapus'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

