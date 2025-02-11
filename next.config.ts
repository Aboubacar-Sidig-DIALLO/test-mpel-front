import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   async redirects() {
    return [
      {
        source: "/", // La route source
        destination: "/product", // La route de destination
        permanent: true, // Utilisez `true` pour une redirection permanente (301)
      },
    ];
  }
};

export default nextConfig;
