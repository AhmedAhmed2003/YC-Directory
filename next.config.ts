// next.config.js
const nextConfig = {
  typescript:{
ignoreBuildErrors:true
  },
  eslint:{
    ignoreDuringBuilds:true
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      // Add other domains you need here
      {
        protocol: 'https',
        hostname: '*',
      }
    ],
  },
  experimental: {
    ppr: 'incremental',
  },
};

export default nextConfig;