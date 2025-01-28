import { z } from 'zod';

const tokenValidation = {
  refreshToken: z.object({
    refreshToken: z.string(),
  }),
};

export default tokenValidation;

