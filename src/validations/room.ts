import { z } from 'zod';

export const createRoomBody = z
  .object({
    nama: z.string().min(1, 'Nama tidak boleh kosong').max(20, 'Nama maksimal 20 huruf'),
    harga: z.coerce.number(),
    status: z.enum(['terisi', 'kosong'], {
      errorMap: () => ({ message: 'Status harus diisi dengan nilai yang benar' }),
    }),
    gambar: z.string().min(1).max(255).nullable().optional(),
    cabang: z.enum(['denpasar', 'klungkung'], {
      errorMap: () => ({ message: 'Cabang harus diisi dengan nilai yang benar' }),
    }),
  })
  .strict();

export const updateRoomBody = z
  .object({
    nama: z.string().min(1, 'Nama tidak boleh kosong').max(20, 'Nama maksimal 20 huruf').optional(),
    harga: z.coerce.number().optional(),
    status: z
      .enum(['terisi', 'kosong'], {
        errorMap: () => ({ message: 'Status harus diisi dengan nilai yang benar' }),
      })
      .optional(),
    gambar: z.string().min(1).max(255).nullable().optional(),
    cabang: z
      .enum(['denpasar', 'klungkung'], {
        errorMap: () => ({ message: 'Cabang harus diisi dengan nilai yang benar' }),
      })
      .optional(),
  })
  .strict();

export const roomParams = z
  .object({
    cabang: z.enum(['denpasar', 'klungkung'], {
      errorMap: () => ({ message: 'Cabang harus diisi dengan nilai yang benar' }),
    }),
    roomId: z.coerce.number(),
  })
  .strict();

export const bulkDeleteRoomQuery = z
  .object({
    id: z
      .string()
      .transform((val) => val.split(',').map(Number))
      .pipe(z.array(z.number().int().positive())),
  })
  .strict();

export const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid file format' })
    .refine((file) => file.size <= 3 * 1024 * 1024, {
      message: 'Ukuran file maksimal 3MB',
    })
    .refine((file) => ['image/apng', 'image/jpeg', 'image/png'].includes(file.type), {
      message: 'format file tidak valid. hanya boleh berupa gambar.',
    }),
});

export type roomParamsType = z.infer<typeof roomParams>;
export type createRoomBodyType = z.infer<typeof createRoomBody>;
export type bulkDeleteRoomQueryType = z.infer<typeof bulkDeleteRoomQuery>;
export type updateRoomBodyType = z.infer<typeof updateRoomBody>;
export type fileUploadSchemaType = z.infer<typeof fileUploadSchema>;

