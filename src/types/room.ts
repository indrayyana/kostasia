export type StatusType = 'terisi' | 'kosong';
export type CabangType = 'denpasar' | 'klungkung';

export interface RoomInterface {
  kamar_id: number;
  nama: string;
  harga: number;
  status: StatusType;
  gambar: string;
  cabang: CabangType;
}

export interface RoomDBInterface {
  kamar_id: number;
  nama: string;
  harga: number;
  status: StatusType;
  gambar: string | null;
  cabang: CabangType;
}

export interface RoomDetailParams {
  params: {
    id: string;
  };
}

