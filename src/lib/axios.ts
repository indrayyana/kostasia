import axios from 'axios';
import { deleteToken, setToken } from '../utils/cookies';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Expires: 0,
};

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers,
  timeout: 60 * 1000, // 1 minute timeout
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
          {},
          { withCredentials: true }
        );

        const { access, refresh } = response.data.tokens;
        setToken(access.token, refresh.token);

        return axios(originalRequest);
      } catch (error) {
        console.log(error);
        deleteToken();

        if (typeof window !== 'undefined') {
          window.location.replace('/');
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;

