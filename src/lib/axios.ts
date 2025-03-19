import axios from 'axios';
import Swal from 'sweetalert2';
import { setToken, deleteToken } from '@/utils/cookies';

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

        return api(originalRequest);
      } catch (error) {
        console.log(error);
        deleteToken();

        if (typeof window !== 'undefined') {
          Swal.fire({
            title: 'Login Diperlukan',
            text: 'Silahkan login terlebih dahulu untuk melanjutkan',
            icon: 'warning',
            theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            customClass: {
              popup: 'w-96 max-w-lg',
              title: 'text-lg font-semibold',
              actions: 'flex justify-around',
              confirmButton: 'text-sm px-4 py-2 bg-primary',
              cancelButton: 'text-sm px-4 py-2 bg-danger',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.replace('/');
            }
          });
        }

        return Promise.reject(error);
      }
    }

    if (error.response?.status === 403) {
      if (typeof window !== 'undefined') {
        window.location.replace('/');
      }
    }

    return Promise.reject(error);
  }
);

export default api;

