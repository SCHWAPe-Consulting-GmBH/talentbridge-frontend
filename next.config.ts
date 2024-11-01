import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/assets/images/**',
        search: '',
      },
      {
        pathname: '/assets/icons/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
