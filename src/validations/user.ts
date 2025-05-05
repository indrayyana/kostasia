import { z } from 'zod';

export const createUserBody = z
  .object({
    // user_id: z.string().uuid(),
    user_id: z.string().optional(),
    nama: z.string().min(1, 'Nama tidak boleh kosong').max(20, 'Nama maksimal 20 huruf'),
    email: z
      .string()
      .min(1, 'Email tidak boleh kosong')
      .email('Email tidak valid')
      .max(64, 'Email maksimal 64 karakter'),
    telepon: z.string().min(1, 'Telepon tidak boleh kosong').max(20),
    gender: z.enum(['laki_laki', 'perempuan'], {
      errorMap: () => ({ message: 'Gender harus diisi dengan nilai yang benar' }),
    }),
    role: z.enum(['pengunjung', 'penyewa', 'admin'], {
      errorMap: () => ({ message: 'Role harus diisi dengan nilai yang benar' }),
    }),
    foto: z.string().min(1).max(255).nullable().optional(),
    ktp: z.string().min(1).max(255).nullable().optional(),
  })
  .strict();

export const updateUserBody = z
  .object({
    nama: z.string().min(1, 'Nama tidak boleh kosong').max(20).optional(),
    telepon: z.string().min(1, 'Telepon tidak boleh kosong').max(20).optional(),
    gender: z
      .enum(['laki_laki', 'perempuan'], {
        errorMap: () => ({ message: 'Gender harus diisi dengan nilai yang benar' }),
      })
      .optional(),
    foto: z.string().min(1).max(255).nullable().optional(),
    ktp: z.string().min(1).max(255).nullable().optional(),
  })
  .strict();

export const updateUserByAdminBody = z
  .object({
    nama: z.string().min(1, 'Nama tidak boleh kosong').max(20).optional(),
    email: z.string().min(1, 'Email tidak boleh kosong').email().max(64).optional(),
    telepon: z.string().min(1, 'Telepon tidak boleh kosong').max(20).optional(),
    gender: z
      .enum(['laki_laki', 'perempuan'], {
        errorMap: () => ({ message: 'Gender harus diisi dengan nilai yang benar' }),
      })
      .optional(),
    role: z
      .enum(['pengunjung', 'penyewa', 'admin'], {
        errorMap: () => ({ message: 'Role harus diisi dengan nilai yang benar' }),
      })
      .optional(),
    foto: z.string().min(1).max(255).nullable().optional(),
    ktp: z.string().min(1).max(255).nullable().optional(),
  })
  .strict();

export const userParams = z
  .object({
    userId: z.string().uuid(),
  })
  .strict();

export const bulkDeleteUserQuery = z
  .object({
    id: z
      .string()
      .transform((val) => val.split(','))
      .pipe(z.array(z.string().uuid())),
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

export type userParamsType = z.infer<typeof userParams>;
export type createUserBodyType = z.infer<typeof createUserBody>;
export type updateUserBodyType = z.infer<typeof updateUserBody>;
export type updateUserByAdminBodyType = z.infer<typeof updateUserByAdminBody>;
export type bulkDeleteUserQueryType = z.infer<typeof bulkDeleteUserQuery>;
export type fileUploadSchemaType = z.infer<typeof fileUploadSchema>;
