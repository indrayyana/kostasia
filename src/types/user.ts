export type RoleType = 'pengunjung' | 'penyewa' | 'admin';
export type GenderType = 'laki_laki' | 'perempuan';

export const genderLabelMap: Record<GenderType, string> = {
  laki_laki: 'Laki-laki',
  perempuan: 'Perempuan',
};

export interface UserInterface {
  user_id: string;
  nama: string;
  telepon: string;
  email: string;
  gender: GenderType;
  role: RoleType;
  foto: string;
  ktp: string;
}

export interface UserDBInterface {
  user_id: string;
  nama: string;
  telepon: string | null;
  email: string;
  gender: string | null;
  role: RoleType;
  foto: string | null;
  ktp: string | null;
  dibuat_pada: Date;
}

export interface UserDashboardInterface {
  total_pengunjung: number;
  total_kamar: number;
  total_pemasukan: number;
  total_penyewa: number;
}

