import { z } from "zod";

export const saveNotifToken = z.object({
  token: z.string(),
  user_id: z.string().uuid(),
});

export const createNotif = z.object({
  judul: z.string().max(50),
  deskripsi: z.string().max(250),
  user_id: z.string().uuid(),
});

export const getNotif = z.object({
  user_id: z.string().uuid(),
});

export const notifParams = z.object({
  notificationId: z.coerce.number(),
});

export type saveNotifTokenBodyType = z.infer<typeof saveNotifToken>;
export type NotifParamsType = z.infer<typeof notifParams>;
export type createNotifBodyType = z.infer<typeof createNotif>;
