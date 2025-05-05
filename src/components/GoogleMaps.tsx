import { useMemo } from 'react';

export default function GoogleMaps({ cabang }: { cabang: 'denpasar' | 'klungkung' }) {
  const lokasi = useMemo(() => {
    return cabang === 'klungkung'
      ? {
          iframeSrc:
            'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10374.492628823115!2d115.39237006356102!3d-8.519598463473322!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd21173dedebc9d%3A0x467fa1e661d57688!2sKost%20Akah!5e0!3m2!1sid!2sid!4v1729089659823!5m2!1sid!2sid',
          title: 'Lokasi Kost ASIA Klungkung',
          tempatTerdekat: [
            { nama: 'SMAN 2 Semarapura', jarak: '1,3 km' },
            { nama: 'SMK TI Bali Global Klungkung', jarak: '1,4 km' },
            { nama: 'SMK Panca Atma Jaya', jarak: '1,4 km' },
            { nama: 'Kantor Camat Klungkung', jarak: '1,5 km' },
            { nama: 'Pengadilan Negeri Semarapura', jarak: '1,6 km' },
            { nama: 'BPJS Kesehatan Kantor Cabang Klungkung', jarak: '1,6 km' },
            { nama: 'Rumah Sakit Umum Bintang', jarak: '1,9 km' },
            { nama: 'SAMSAT Klungkung', jarak: '2,1 km' },
            { nama: 'Rumah Sakit Umum Daerah Kabupaten Klungkung', jarak: '2,5 km' },
            { nama: 'Monumen Puputan Klungkung', jarak: '2,7 km' },
          ],
        }
      : {
          iframeSrc:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d368.16361608224753!2d115.2241939133244!3d-8.67694646354412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2418a8adfd849%3A0x105878587377e5db!2sKost%20ASIA!5e0!3m2!1sid!2sid!4v1743140725268!5m2!1sid!2sid',
          title: 'Lokasi Kost ASIA Denpasar',
          tempatTerdekat: [
            { nama: 'Pascasarjana Undiknas', jarak: '300 m' },
            { nama: 'SMA Negeri 2 Denpasar', jarak: '1 km' },
            { nama: 'Universitas Udayana Kampus Sudirman', jarak: '1,2 km' },
            { nama: 'Institut Desain & Bisnis Bali', jarak: '1,3 km' },
            { nama: 'Institut Teknologi Dan Bisnis STIKOM BALI', jarak: '1,4 km' },
            { nama: 'BPJS Kesehatan Kantor Cabang Denpasar', jarak: '1,7 km' },
            { nama: 'Monumen Bajra Sandhi', jarak: '1,8 km' },
            { nama: 'Institut Bisnis dan Teknologi Indonesia (INSTIKI)', jarak: '1,8 km' },
            { nama: 'Rumah Sakit Umum Pusat Prof. dr. I.G.N.G. Ngoerah', jarak: '2,2 km' },
            { nama: 'Universitas Pendidikan Nasional (UNDIKNAS) Denpasar', jarak: '2,7 km' },
          ],
        };
  }, [cabang]);

  return (
    <section className="px-12 py-20 bg-gray-100 dark:bg-gray-900">
      <p className="text-3xl font-bold mb-5 text-blue-700">Lokasi Kami</p>
      <div
        data-aos="zoom-in-up"
        className="my-5 relative w-full h-115 text-center rounded-2xl shadow-xl overflow-hidden"
      >
        <iframe
          src={lokasi.iframeSrc}
          className="absolute top-0 left-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={lokasi.title}
        />
      </div>
      <p className="text-3xl font-bold mt-20 mb-10 text-blue-700 text-center">Tempat Terdekat</p>
      <ul className="list-disc flex max-sm:flex-col justify-evenly gap-15 mx-auto px-8">
        {Array.from({ length: 2 }, (_, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            {lokasi.tempatTerdekat.slice(idx * 5, (idx + 1) * 5).map((tempat, i) => (
              <li key={i}>
                <p className="text-black dark:text-white">{tempat.nama}</p>
                <p className="text-gray-600">{tempat.jarak}</p>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </section>
  );
}
