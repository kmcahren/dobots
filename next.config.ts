import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Adding webpack configuration to copy PWA icons to the public directory under _next/static
  // This is a common approach if not using a specific PWA plugin that handles this.
  // However, for simple manifest.json and icons directly in /public, this might not be strictly necessary
  // as Next.js should serve them directly. Keeping it commented out unless issues arise.
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // Example: If you had a more complex PWA setup with a service worker
  //   }
  //   return config;
  // },
};

export default nextConfig;
