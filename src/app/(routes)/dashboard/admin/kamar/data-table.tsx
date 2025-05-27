'use client';

import * as React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import TableSearch from '@/components/ui/table-search';
import TablePagination from '@/components/ui/table-pagination';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBulkDeleteRooms, useCreateRoom, useUploadRoomImage } from '@/hooks/useRoom';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoomBody } from '@/validations/room';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CabangType } from '@/types/room';

interface DataTableProps<TData extends { kamar_id: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  refetch: () => void;
}

export function DataTable<TData extends { kamar_id: number }, TValue>({
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
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [imageRoom, setImageRoom] = React.useState<File | null>(null);

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

  const { mutate: bulkDeleteRoom, isPending: bulkDeleteRoomIsLoading } = useBulkDeleteRooms({
    onSuccess: () => {
      refetch();
      setRowSelection({});
      setIsOpen(false);
      toast.success('Kamar berhasil dihapus', { duration: 3000 });
    },
    onError: () => {
      toast.error('Terjadi kesalahan saat menghapus kamar', { duration: 3000 });
    },
  });

  const handleDelete = () => {
    const ids = selectedRows.map((row) => row.original.kamar_id);
    bulkDeleteRoom({ id: ids });
  };

  const { mutate: uploadRoomImage, isPending: uploadRoomImageIsLoading } = useUploadRoomImage({
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message
          : 'Terjadi kesalahan saat mengupload foto kamar';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const { mutate: createRoom, isPending: createRoomIsLoading } = useCreateRoom({
    onError: (error) => {
      console.log(error);

      const errorMessage =
        error.response?.data?.code === 400
          ? error.response?.data?.errors[0]?.message || error.response?.data?.message
          : 'Terjadi kesalahan saat menambahkan kamar';
      toast.error(errorMessage, { duration: 5000 });
    },
  });

  const form = useForm<z.infer<typeof createRoomBody>>({
    resolver: zodResolver(createRoomBody),
    defaultValues: {
      nama: '',
      harga: undefined,
      cabang: undefined,
      status: undefined,
      gambar: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof createRoomBody>) => {
    try {
      const createdRoom = await new Promise<{ kamar_id: number; cabang: CabangType }>((resolve, reject) => {
        createRoom(
          {
            nama: values.nama,
            harga: values.harga,
            cabang: values.cabang,
            status: values.status,
            ...(imageRoom && { gambar: values.gambar }),
          },
          {
            onSuccess: (response) => {
              const kamar = response.data.kamar;
              if (kamar?.kamar_id) {
                resolve({ kamar_id: kamar.kamar_id, cabang: kamar.cabang });
              } else {
                reject(new Error('Invalid response format: kamar_id missing'));
              }
            },
            onError: (error) => reject(error),
          }
        );
      });

      if (imageRoom) {
        await new Promise<void>((resolve, reject) => {
          uploadRoomImage(
            {
              param: { cabang: createdRoom.cabang, roomId: createdRoom.kamar_id },
              body: { file: imageRoom },
            },
            {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            }
          );
        });
      }

      form.reset();
      toast.success('Berhasil menambahkan kamar baru', { duration: 3000 });
      refetch();
      setOpen(false);
      setPreviewImage(null);
    } catch (error) {
      console.error('Create Room Failed:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageRoom(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-between">
        <TableSearch table={table} />

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
              <DialogTitle>Tambah Kamar Baru</DialogTitle>
              <DialogDescription>
                Tambahkan data kamar baru. Klik simpan jika sudah selesai memasukkan data.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5 pb-8">
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
                    name="harga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Harga<sup className="text-red-600 dark:text-red-400">*</sup>
                        </FormLabel>
                        <FormControl>
                          <Input id="harga" type="number" placeholder="Harga" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cabang"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Cabang<sup className="text-red-600 dark:text-red-400">*</sup>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih cabang kost" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="denpasar">{'Denpasar'}</SelectItem>
                            <SelectItem value="klungkung">{'Klungkung'}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status<sup className="text-red-600 dark:text-red-400">*</sup>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih status kamar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="terisi">{'Terisi'}</SelectItem>
                            <SelectItem value="kosong">{'Kosong'}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gambar"
                    render={() => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Foto Kamar Kost (PNG/JPG)</FormLabel>
                        <FormControl>
                          <Input id="gambar" type="file" accept="image/*" onChange={handleImageChange} />
                        </FormControl>
                        <FormDescription>Maksimal ukuran file 3MB</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!!previewImage && (
                    <Image src={previewImage} alt="foto kamar" width={20} height={20} className="w-auto h-30 mx-auto" />
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="dark:text-white font-bold"
                    disabled={createRoomIsLoading || uploadRoomImageIsLoading}
                  >
                    {createRoomIsLoading || uploadRoomImageIsLoading ? (
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
            <AlertDialogCancel disabled={bulkDeleteRoomIsLoading}>Batal</AlertDialogCancel>
            <Button variant={'destructive'} onClick={handleDelete} disabled={bulkDeleteRoomIsLoading}>
              {bulkDeleteRoomIsLoading ? (
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

