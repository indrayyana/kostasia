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
  ('Kamar 1', 'Kosong', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 2', 'Terisi', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 3', 'Terisi', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 4', 'Terisi', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 5', 'Terisi', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 6', 'Terisi', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 7', 'Terisi', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 8', 'Terisi', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 9', 'Terisi', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 10', 'Terisi', '/assets/dummy.png', 'Denpasar'),
  ('Kamar 1', 'Kosong', '/assets/dummy.png', 'Klungkung'),
  ('Kamar 2', 'Terisi', '/assets/dummy.png', 'Klungkung'),
  ('Kamar 3', 'Kosong', '/assets/dummy.png', 'Klungkung'),
  ('Kamar 4', 'Terisi', '/assets/dummy.png', 'Klungkung'),
  ('Kamar 5', 'Terisi', '/assets/dummy.png', 'Klungkung'),
  ('Kamar 6', 'Terisi', '/assets/dummy.png', 'Klungkung');

alter table kamar enable row level security;