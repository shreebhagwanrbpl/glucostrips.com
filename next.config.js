/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.imimg.com",
      },
      {
        protocol: "https",
        hostname: "**.imimg.com",
      },
      {
        protocol: "https",
        hostname: "5.imimg.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
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