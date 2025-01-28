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

