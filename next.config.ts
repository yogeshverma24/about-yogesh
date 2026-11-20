import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.apollopipes.com' },
      { protocol: 'https', hostname: 'www.nilkamal.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: '5.imimg.com' },
      { protocol: 'https', hostname: 'www.bosch-professional.com' },
      { protocol: 'https', hostname: 'www.polycab.com' },
      { protocol: 'https', hostname: 'www.supremepipe.com' },
      { protocol: 'https', hostname: 'rukminim2.flixcart.com' },
    ],
  },
};

export default nextConfig;
