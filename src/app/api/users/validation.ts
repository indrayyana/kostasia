import { z } from 'zod';

export const createUser = z.object({
  nama: z.string().max(20),
  email: z.string().email().max(64),
  telepon: z.string().max(20),
  role: z.enum(['pengunjung', 'penyewa', 'admin']),
});

export const updateUser = z.object({
  user_id: z.string().uuid(),
  nama: z.string().max(20).optional(),
  email: z.string().email().max(64).optional(),
  telepon: z.string().max(20).optional(),
});

export const getUser = z.object({
  user_id: z.string().uuid(),
});

export const deleteUser = z.object({
  user_id: z.string().uuid(),
});

