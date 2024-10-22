/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {};

const buildConfig = withPWA({
  dest: 'public',
})(nextConfig);

export default buildConfig;

