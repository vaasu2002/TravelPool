import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*','https://3000-idx-poolup-1745309924242.cluster-ikxjzjhlifcwuroomfkjrx437g.cloudworkstations.dev'],
  eslint: {
    ignoreDuringBuilds: true,
  }  
};

export default nextConfig;
