/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === 'google') {
        const data = {
          nama: user.name!,
          email: user.email!,
          foto: user.image!,
          role: 'pengunjung',
        };

        try {
          let userFromDB = await prisma.user.findUnique({
            where: {
              email: data.email,
            },
          });

          if (userFromDB) {
            data.role = userFromDB.role;
            userFromDB = await prisma.user.update({
              where: {
                user_id: userFromDB.user_id,
              },
              data: data,
            });
          } else {
            userFromDB = await prisma.user.create({
              data: data,
            });
          }

          token.email = userFromDB.email;
          token.name = userFromDB.nama;
          token.role = userFromDB.role;
        } catch (error) {
          console.log('Error saving user to database:', error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email!;
        session.user.name = token.name!;
        session.user.role = token.role!;
      }

      return session;
    },
  },
  pages: {
    signIn: '/dashboard/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

