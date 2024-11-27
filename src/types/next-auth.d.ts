/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string | null;
    email?: string | null;
    name?: string | null;
  }
}

