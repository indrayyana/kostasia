export interface NotifInterface {
  notifikasi_id: number;
  judul: string;
  deskripsi: string;
  status: boolean;
  user_id: string;
  user: {
    nama: string;
  };
}

export interface UserNotificationInterface {
  user_id: string;
  token: string;
  user: {
    nama: string;
  };
}

