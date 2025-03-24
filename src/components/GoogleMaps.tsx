export default function GoogleMaps() {
  return (
    <section className="px-12 py-20 bg-gray-100 dark:bg-gray-900">
      <p className="text-3xl font-bold mb-5 text-blue-700">Lokasi Kami</p>
      <div data-aos="zoom-in-up" className="relative w-full h-115 text-center rounded-2xl shadow-xl overflow-hidden">
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
    </section>
  );
}
