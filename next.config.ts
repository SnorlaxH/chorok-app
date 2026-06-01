import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    if (process.env.NODE_ENV !== 'development') return []

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ]
  },
  allowedDevOrigins: ['starboard.iptime.org'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'i1.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'i2.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'i3.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'i4.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com'
      },
      {
        protocol: 'https',
        hostname: 'image.genie.co.kr'
      },
      {
        protocol: 'https',
        hostname: 'i.namu.wiki'
      }
    ],
  },
};

export default nextConfig;
