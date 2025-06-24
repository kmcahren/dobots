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
  // Add this configuration to allow cross-origin requests from your preview URL
  allowedDevOrigins: ['https://9000-firebase-studio-1749411846030.cluster-pgviq6mvsncnqxx6kr7pbz65v6.cloudworkstations.dev'],
};

export default nextConfig;
