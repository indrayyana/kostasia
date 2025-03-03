const dateFormat = (strDate: string) => {
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

export default dateFormat;

