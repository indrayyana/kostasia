export type RoleType = 'pengunjung' | 'penyewa' | 'admin';

export interface UserInterface {
  user_id: string;
  nama: string;
  telepon: string;
  email: string;
  role: RoleType;
  foto: string;
  ktp: string;
}

export interface UserDBInterface {
  user_id: string;
  nama: string;
  telepon: string | null;
  email: string;
  role: RoleType;
  foto: string | null;
  ktp: string | null;
  dibuat_pada: Date;
}

