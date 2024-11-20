/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
