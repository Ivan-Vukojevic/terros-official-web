import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  htmlLimitedBots: /.*/,
  allowedDevOrigins: [
    "localhost",
  ],
  images: {
    qualities: [50, 55, 60, 65],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
