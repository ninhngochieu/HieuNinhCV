import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // No backend: portfolio content is served from local structured JSON
  // (frontend/src/data/portfolio.json).
};

export default nextConfig;
