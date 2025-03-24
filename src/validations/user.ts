import { z } from 'zod';

export const createUserBody = z
  .object({
    nama: z.string().max(20),
    email: z.string().email().max(64),
    telepon: z.string().max(20),
    role: z.enum(['pengunjung', 'penyewa', 'admin']),
  })
  .strict();

export const updateUserBody = z
  .object({
    nama: z.string().max(20).optional(),
    email: z.string().email().max(64).optional(),
    telepon: z.string().max(20).optional(),
  })
  .strict();

export const userParams = z
  .object({
    userId: z.string().uuid(),
  })
  .strict();

export type userParamsType = z.infer<typeof userParams>;
export type createUserBodyType = z.infer<typeof createUserBody>;
export type updateUserBodyType = z.infer<typeof updateUserBody>;

