export const dateFormat = (strDate: string) => {
  const date = new Date(strDate);
  const dateFormatted = date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const timeFormatted = date
    .toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace('.', ':');

  return `${dateFormatted} ${timeFormatted}`;
};

export const priceFormat = (angka: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(angka)
    .replace(/,00$/, '')
    .replace(/\s+/g, '');
};

