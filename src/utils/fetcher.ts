import api from '../lib/axios';

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

