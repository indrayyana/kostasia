export type statusType = 'Terisi' | 'Kosong';
export type cabangType = 'Denpasar' | 'Klungkung';

export type RoomType = {
  kamar_id: number;
  nama: string;
  status: statusType;
  gambar: string;
  cabang: cabangType;
};

