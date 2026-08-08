import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static portfolio — no server runtime needed.
  // `next build` emits flat HTML/JS/CSS into `out/`, servable by any static host.
  output: 'export',
  images: {
    // Export mode has no image-optimization server; serve originals as-is.
    unoptimized: true,
  },
  // No backend: portfolio content is served from local structured JSON
  // (frontend/src/data/portfolio.json).
};

export default nextConfig;
