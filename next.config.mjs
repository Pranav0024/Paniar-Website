/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: ""
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint warnings
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors
  },

  server: {
    port: process.env.PORT || 3000, // Use Render's PORT or default to 3000
  },
};

export default nextConfig;