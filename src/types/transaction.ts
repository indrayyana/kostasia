export type StatusTransaksi = 'pending' | 'settlement';

export interface TransactionInterface {
    transaksi_id: string;
    total: number;
    status: StatusTransaksi;
    user_id: string;
}