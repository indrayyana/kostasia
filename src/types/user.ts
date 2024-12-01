export type roleType = 'pengunjung' | 'penyewa' | 'admin';

export type UserType = {
  user_id: string;
  nama: string;
  telepon: string;
  email: string;
  role: roleType;
  foto: string;
  ktp: string;
};

