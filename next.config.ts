import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ["picsum.photos"], // Add your image host domains here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io"
      },
      // Add other IPFS gateways if needed
      {
        protocol: "https",
        hostname: "*.ipfs.dweb.link"
      },
      {
        protocol: "https",
        hostname: "ipfs.infura.io"
      }
    ]
  }
};

export default nextConfig;
