import { z } from 'zod';

export const refreshToken = z.object({
  refreshToken: z.string(),
});

export type refreshTokenBodyType = z.infer<typeof refreshToken>;

