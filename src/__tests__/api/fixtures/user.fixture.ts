import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';
import { UserInterface } from '@/types/user';

export const userOne: UserInterface = {
  user_id: uuidv4(),
  nama: 'I Putu Testing',
  email: 'pututesting@gmail.com',
  telepon: '081234567890',
  gender: 'laki_laki',
  role: 'penyewa',
  foto: '',
  ktp: '',
};

export const userTwo: UserInterface = {
  user_id: uuidv4(),
  nama: 'I Kadek Testing',
  email: 'kadektesting@gmail.com',
  telepon: '081234567890',
  gender: 'laki_laki',
  role: 'penyewa',
  foto: '',
  ktp: '',
};

export const admin: UserInterface = {
  user_id: uuidv4(),
  nama: 'Admin',
  email: 'admin@gmail.com',
  telepon: '081234567890',
  gender: 'perempuan',
  role: 'admin',
  foto: '',
  ktp: '',
};

export const insertUsers = async (users: UserInterface[]) => {
  return await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
};

