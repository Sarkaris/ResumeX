/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase the limit to 10 megabytes
    },
  },
};

export default nextConfig;