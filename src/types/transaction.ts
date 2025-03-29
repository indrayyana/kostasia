export type StatusTransaksi = 'pending' | 'settlement';

export interface TransactionInterface {
  transaksi_id: string;
  total: number;
  status: StatusTransaksi;
  user_id: string;
  user: {
    nama: string;
  };
  kamar: {
    nama: string;
  };
  dibuat_pada: string;
}
