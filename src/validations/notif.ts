import { z } from 'zod';

const notifValidation = {
  saveNotifToken: z.object({
    token: z.string(),
    user_id: z.string().uuid(),
  }),

  createNotif: z.object({
    judul: z.string().max(50),
    text: z.string().max(250),
    user_id: z.string().uuid(),
  }),

  getNotif: z.object({
    user_id: z.string().uuid(),
  }),

  deleteNotif: z.object({
    notifikasi_id: z.number(),
  }),
};

export default notifValidation;

