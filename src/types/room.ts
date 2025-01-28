export type StatusType = 'Terisi' | 'Kosong';
export type CabangType = 'Denpasar' | 'Klungkung';

export interface RoomInterface {
  kamar_id: number;
  nama: string;
  status: StatusType;
  gambar: string;
  cabang: CabangType;
}

