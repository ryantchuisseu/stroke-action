import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // pièce jointe du formulaire de contact + marge multipart
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
