import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const users = [
  {
    user_id: '1',
    nama: 'Putu',
    telepon: 628123456789,
    email: 'putu@gmail.com',
    role: 'admin',
    foto: '/images/user/user-01.png',
    ktp: '/images/user/ktp-dummy.png',
  },
  {
    user_id: '2',
    nama: 'Kadek',
    telepon: 628123456789,
    email: 'kadek@gmail.com',
    role: 'penyewa',
    foto: '/images/user/user-02.png',
    ktp: '/images/user/ktp-dummy.png',
  },
  {
    user_id: '3',
    nama: 'Komang',
    telepon: 628123456789,
    email: 'komang@gmail.com',
    role: 'pengunjung',
    foto: '/images/user/user-03.png',
    ktp: '/images/user/ktp-dummy.png',
  },
];

export async function GET() {
  return NextResponse.json({ status: 200, message: 'Success', users });
}

