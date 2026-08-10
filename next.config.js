/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/items",
        permanent: true,
      },
      {
        source: "/products/:slug",
        destination: "/items/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;