export default function GoogleMaps({ cabang }: { cabang: 'denpasar' | 'klungkung' }) {
  return (
    <>
      {cabang === 'klungkung' ? (
        <section className="px-12 py-20 bg-gray-100 dark:bg-gray-900">
          <p className="text-3xl font-bold mb-5 text-blue-700">Lokasi Kami</p>
          <div
            data-aos="zoom-in-up"
            className="my-5 relative w-full h-115 text-center rounded-2xl shadow-xl overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10374.492628823115!2d115.39237006356102!3d-8.519598463473322!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd21173dedebc9d%3A0x467fa1e661d57688!2sKost%20Akah!5e0!3m2!1sid!2sid!4v1729089659823!5m2!1sid!2sid"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kost ASIA Klungkung"
            />
          </div>
          <p className="text-3xl font-bold mt-20 mb-10 text-blue-700 text-center">Tempat Terdekat</p>
          <ul className="list-disc flex max-sm:flex-col justify-evenly gap-15 mx-auto px-8">
            <div className="flex flex-col gap-4">
              <li>
                <p>SMK TI Bali Global Klungkung</p>
                <p className="text-gray-600">1,4 km</p>
              </li>
              <li>
                <p>SMAN 2 Semarapura</p>
                <p className="text-gray-600">1,3 km</p>
              </li>
              <li>
                <p>SMK Panca Atma Jaya</p>
                <p className="text-gray-600">1,4 km</p>
              </li>
              <li>
                <p>Rumah Sakit Umum Bintang</p>
                <p className="text-gray-600">1,9 km</p>
              </li>
              <li>
                <p>Pengadilan Negeri Semarapura</p>
                <p className="text-gray-600">1,6 km</p>
              </li>
            </div>
            <div className="flex flex-col gap-4">
              <li>
                <p>Kantor Camat Klungkung</p>
                <p className="text-gray-600">1,5 km</p>
              </li>
            </div>
          </ul>
        </section>
      ) : (
        <section className="px-12 py-20 bg-gray-100 dark:bg-gray-900">
          <p className="text-3xl font-bold mb-5 text-blue-700">Lokasi Kami</p>
          <div
            data-aos="zoom-in-up"
            className="my-5 relative w-full h-115 text-center rounded-2xl shadow-xl overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d368.16361608224753!2d115.2241939133244!3d-8.67694646354412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2418a8adfd849%3A0x105878587377e5db!2sKost%20ASIA!5e0!3m2!1sid!2sid!4v1743140725268!5m2!1sid!2sid"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kost ASIA Denpasar"
            />
          </div>
          <p className="text-3xl font-bold mt-20 mb-10 text-blue-700 text-center">Tempat Terdekat</p>
          <ul className="list-disc flex max-sm:flex-col justify-evenly gap-15 mx-auto px-8">
            <div className="flex flex-col gap-4">
              <li>
                <p>ITB STIKOM Bali</p>
                <p className="text-gray-600">1,4 km</p>
              </li>
              <li>
                <p>Universitas Udayana Kampus Sudirman</p>
                <p className="text-gray-600">1,2 km</p>
              </li>
              <li>
                <p>Rumah Sakit Umum Pusat Prof. dr. I.G.N.G. Ngoerah</p>
                <p className="text-gray-600">2,2 km</p>
              </li>
              <li>
                <p>Pascasarjana Undiknas</p>
                <p className="text-gray-600">300 m</p>
              </li>
              <li>
                <p>Institut Desain & Bisnis Bali</p>
                <p className="text-gray-600">1,3 km</p>
              </li>
            </div>
            <div className="flex flex-col gap-4">
              <li>
                <p>Universitas Pendidikan Nasional (UNDIKNAS) Denpasar</p>
                <p className="text-gray-600">2,7 km</p>
              </li>
              <li>
                <p>Monumen Bajra Sandhi</p>
                <p className="text-gray-600">1,8 km</p>
              </li>
            </div>
          </ul>
        </section>
      )}
    </>
  );
}
