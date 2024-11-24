/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

const buildConfig = withPWA({
  dest: 'public',
})(nextConfig);

export default buildConfig;

