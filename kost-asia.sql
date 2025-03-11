-- Change timezone
alter database postgres
set timezone to 'Asia/Makassar';

-- Create the table
create table kamar (
  id bigint primary key generated always as identity,
  nama varchar not null,
  status varchar not null,
  gambar varchar not null,
  cabang varchar not null
);

-- Insert some sample data into the table
insert into kamar (nama, status, gambar, cabang)
values
  ('Kamar 1', 'kosong', '/assets/dummy.png', 'denpasar'),
  ('Kamar 2', 'terisi', '/assets/dummy.png', 'denpasar'),
  ('Kamar 3', 'terisi', '/assets/dummy.png', 'denpasar'),
  ('Kamar 4', 'terisi', '/assets/dummy.png', 'denpasar'),
  ('Kamar 5', 'terisi', '/assets/dummy.png', 'denpasar'),
  ('Kamar 6', 'terisi', '/assets/dummy.png', 'denpasar'),
  ('Kamar 7', 'terisi', '/assets/dummy.png', 'denpasar'),
  ('Kamar 8', 'terisi', '/assets/dummy.png', 'denpasar'),
  ('Kamar 9', 'terisi', '/assets/dummy.png', 'denpasar'),
  ('Kamar 10', 'terisi', '/assets/dummy.png', 'denpasar'),
  ('Kamar 1', 'kosong', '/assets/dummy.png', 'klungkung'),
  ('Kamar 2', 'terisi', '/assets/dummy.png', 'klungkung'),
  ('Kamar 3', 'kosong', '/assets/dummy.png', 'klungkung'),
  ('Kamar 4', 'terisi', '/assets/dummy.png', 'klungkung'),
  ('Kamar 5', 'terisi', '/assets/dummy.png', 'klungkung'),
  ('Kamar 6', 'terisi', '/assets/dummy.png', 'klungkung');

alter table kamar enable row level security;

insert into "kamar" (nama, harga, status, gambar, cabang)
values
  ('Kamar 1', 500000, 'kosong', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 2', 500000, 'terisi', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 3', 500000, 'terisi', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 4', 500000, 'terisi', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 5', 500000, 'terisi', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 6', 500000, 'terisi', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 7', 500000, 'terisi', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 8', 500000, 'terisi', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 9', 500000, 'terisi', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 10', 500000, 'terisi', '/assets/dummy.jpg', 'denpasar'),
  ('Kamar 1', 500000, 'kosong', '/assets/dummy.jpg', 'klungkung'),
  ('Kamar 2', 500000, 'terisi', '/assets/dummy.jpg', 'klungkung'),
  ('Kamar 3', 500000, 'kosong', '/assets/dummy.jpg', 'klungkung'),
  ('Kamar 4', 500000, 'terisi', '/assets/dummy.jpg', 'klungkung'),
  ('Kamar 5', 500000, 'terisi', '/assets/dummy.jpg', 'klungkung'),
  ('Kamar 6', 500000, 'terisi', '/assets/dummy.jpg', 'klungkung');