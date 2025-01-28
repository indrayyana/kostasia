import { z } from 'zod';

const userValidation = {
  createUser: z.object({
    nama: z.string().max(20),
    email: z.string().email().max(64),
    telepon: z.string().max(20),
    role: z.enum(['pengunjung', 'penyewa', 'admin']),
  }),

  updateUser: z.object({
    user_id: z.string().uuid(),
    nama: z.string().max(20).optional(),
    email: z.string().email().max(64).optional(),
    telepon: z.string().max(20).optional(),
  }),

  getUser: z.object({
    user_id: z.string().uuid(),
  }),

  deleteUser: z.object({
    user_id: z.string().uuid(),
  }),
};

export default userValidation;
