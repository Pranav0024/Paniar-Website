/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: "",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint warnings
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors
  },
  // Removed the invalid 'server' configuration
};

export default nextConfig;