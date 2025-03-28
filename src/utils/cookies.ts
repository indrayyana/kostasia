'use server';

import { cookies } from 'next/headers';

export async function getToken() {
  return cookies().get('access-token')?.value || null;
}

export async function setToken(accessToken: string, refreshToken: string) {
  cookies().set('access-token', accessToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 2, // 2 jam
    sameSite: 'strict',
  });

  cookies().set('refresh-token', refreshToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 hari
    sameSite: 'strict',
  });
}

export async function deleteToken() {
  cookies().delete('access-token');
  cookies().delete('refresh-token');
}

