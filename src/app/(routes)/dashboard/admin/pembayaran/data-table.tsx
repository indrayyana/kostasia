/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { sendPushNotification } from '@/utils/firebase-admin';
import { UserNotificationInterface } from '@/types/notif';
import {
  useBulkDeleteNotification,
  useCreateNotification,
  useFetchUsersWithNotification,
} from '@/hooks/useNotification';
import { Skeleton } from '@/components/ui/skeleton';

interface DataTableProps<
  TData extends { notifikasi_id: string | number },
  TValue
> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  refetch: () => void;
}

export const formSchema = z.object({
  judul: z.string().min(3, {
    message: '"Judul" tidak boleh kosong.',
  }),
  deskripsi: z.string().min(3, { message: '"Text" tidak boleh kosong.' }),
  kepada: z.string().min(3, { message: '"Kepada" tidak boleh kosong.' }),
});

export function DataTable<
  TData extends { notifikasi_id: string | number },
  TValue
>({ columns, data = [], isLoading, refetch }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const { data: dataUser, isPending: isLoadingUser } =
    useFetchUsersWithNotification();
  const users: UserNotificationInterface[] = dataUser?.users || [];

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

  const { mutate: bulkDeleteNotif, isPending: bulkDeleteNotifIsLoading } =
    useBulkDeleteNotification({
      onSuccess: () => {
        refetch();
        setRowSelection({});
        setIsOpen(false);
        toast.success('Notifikasi berhasil dihapus');
      },
      onError: () => {
        toast.error('Terjadi kesalahan saat menghapus notifikasi');
      },
    });

  const handleDelete = () => {
    const ids = selectedRows.map((row) => row.original.notifikasi_id);
    // @ts-expect-error off
    bulkDeleteNotif(ids);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: '',
      kepada: '',
      deskripsi: '',
    },
  });

  const { mutate: createNotification, isPending: createNotificationIsLoading } =
    useCreateNotification({
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast.error('Terjadi kesalahan saat menambahkan Notifikasi');
      },
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedUser = users.find((user) => user.user_id === values.kepada);
    if (!selectedUser) {
      toast.error('Token tidak ditemukan untuk user yang dipilih.');
      return;
    }

    const token = selectedUser.token;

    // @ts-expect-error off
    createNotification({
      judul: values.judul,
      deskripsi: values.deskripsi,
      user_id: values.kepada,
    });
    await sendPushNotification(token, values);

    form.reset();
    setOpen(false);
    toast.success('Notifikasi berhasil dikirim');
  }

  return (
    <>
      <div className="flex gap-2 justify-between">
        <TableSearch table={table} />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size={'sm'} className="dark:text-white font-bold">
              <Plus />
              Tambah
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] text-black-2 dark:text-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Tambah Notifikasi</DialogTitle>
                  <DialogDescription>
                    Kirim notifikasi kepada penyewa. Klik kirim jika sudah
                    selesai memasukkan data.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="judul"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel htmlFor="judul" className="text-right">
                            Judul
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="judul"
                              className="col-span-3"
                              placeholder="Judul notifikasi"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="col-span-3" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel htmlFor="text" className="text-right">
                            Deskripsi
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Deskripsi notifikasi"
                              id="text"
                              className="col-span-3"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="col-span-3" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="kepada"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel htmlFor="user_id" className="text-right">
                            Kepada
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="col-span-3">
                                <SelectValue
                                  placeholder={
                                    isLoadingUser
                                      ? 'Loading...'
                                      : 'Pilih penyewa'
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingUser ? (
                                <div className="p-4 text-center">
                                  Loading...
                                </div>
                              ) : (
                                users.map((user) => (
                                  <SelectItem
                                    key={user.user_id}
                                    value={user.user_id}
                                  >
                                    {user.user.nama}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="col-span-3" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="dark:text-white font-bold"
                    disabled={createNotificationIsLoading}
                  >
                    {createNotificationIsLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" />
                        <span>Loading</span>
                      </div>
                    ) : (
                      'Kirim'
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
                    <TableHead
                      key={header.id}
                      className="font-bold text-black-2 dark:text-white"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                <TableRow
                  className="dark:border-gray-500"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
              Apakah Anda yakin ingin menghapus data yang dipilih ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={bulkDeleteNotifIsLoading}>
              Batal
            </AlertDialogCancel>
            <Button
              variant={'destructive'}
              onClick={handleDelete}
              disabled={bulkDeleteNotifIsLoading}
            >
              {bulkDeleteNotifIsLoading ? (
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

