/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"], // Domaine pour les images autorisées
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Appliquer à toutes les pages
        headers: [
          { key: "Cache-Control", value: "no-cache" }, // Cache control pour toutes les pages
        ],
      },
    ];
  },
};

module.exports = nextConfig;
