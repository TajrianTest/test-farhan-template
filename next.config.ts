import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cms.optimizely.com',
      },
      {
        protocol: 'https',
        hostname: '*.cmstest.optimizely.com',
      },
      // Add your DAM hostname here
      // {
      //   protocol: 'https',
      //   hostname: 'your-dam-instance.optimizely.com',
      // },
    ],
  },
};

export default nextConfig;
