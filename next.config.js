/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'http://localhost:3000/auth/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'source.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
