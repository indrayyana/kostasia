/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    TYPE: process.env.TYPE,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    PRIVATE_KEY_ID: process.env.PRIVATE_KEY_ID,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    CLIENT_ID: process.env.CLIENT_ID,
    AUTH_URI: process.env.AUTH_URI,
    TOKEN_URI: process.env.TOKEN_URI,
    AUTH_PROVIDER_CERT_URL: process.env.AUTH_PROVIDER_CERT_URL,
    CLIENT_CERT_URL: process.env.CLIENT_CERT_URL,
    UNIVERSE_DOMAIN: process.env.UNIVERSE_DOMAIN,
    VAPID_KEY: process.env.VAPID_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.kostasia.com',
      },
    ],
  },
};

const buildConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
})(nextConfig);

export default buildConfig;

