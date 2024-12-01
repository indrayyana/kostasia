/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
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

