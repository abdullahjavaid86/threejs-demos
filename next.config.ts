import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["@react-three/drei", "@react-three/postprocessing", "motion"],
  },
};

export default nextConfig;
