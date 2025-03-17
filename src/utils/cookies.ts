'use server';

import { cookies } from 'next/headers';

export async function checkRefreshTokenExist() {
  return cookies().has('refresh-token');
}

export async function setToken(accessToken: string, refreshToken: string) {
  cookies().set('access-token', accessToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 hari
  });

  cookies().set('refresh-token', refreshToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 hari
  });
}

export async function deleteToken() {
  cookies().delete('access-token');
  cookies().delete('refresh-token');
}

