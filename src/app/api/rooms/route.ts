import { NextResponse } from 'next/server';

const data = [
  {
    id: 1,
    name: 'Kamar 1',
    info: 'Terisi',
    image: '/assets/dummy.png',
  },
  {
    id: 2,
    name: 'Kamar 2',
    info: 'Terisi',
    image: '/assets/dummy.png',
  },
  {
    id: 3,
    name: 'Kamar 3',
    info: 'Kosong',
    image: '/assets/dummy.png',
  },
  {
    id: 4,
    name: 'Kamar 4',
    info: 'Terisi',
    image: '/assets/dummy.png',
  },
  {
    id: 5,
    name: 'Kamar 5',
    info: 'Terisi',
    image: '/assets/dummy.png',
  },
  {
    id: 6,
    name: 'Kamar 6',
    info: 'Kosong',
    image: '/assets/dummy.png',
  },
];

export async function GET() {
  return NextResponse.json({ status: 200, message: 'Success', data });
}

