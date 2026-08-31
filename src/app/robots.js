export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/export",
        "/_next/",
        "/*?search=",
        "/*?category=",
      ],
    },
    sitemap: "https://glucostrips.com/sitemap.xml",
  };
}