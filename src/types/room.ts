export type StatusType = 'Terisi' | 'Kosong';
export type CabangType = 'denpasar' | 'klungkung';

export interface RoomInterface {
  kamar_id: number;
  nama: string;
  harga: number;
  status: StatusType;
  gambar: string;
  cabang: CabangType;
}

export interface RoomDetailParams {
  params: {
    id: string;
  };
}

