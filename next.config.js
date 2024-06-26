/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
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
        hostname: "links.papareact.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "travelaroundjamaica.com",
      },
      {
        protocol: "https",
        hostname: "assets.simpleviewinc.com",
      },
      {
        protocol: "https",
        hostname: "greengrottocavesja.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "yaadventures_cld",
    mapbox_key:
      "pk.eyJ1IjoidGFubzkxIiwiYSI6ImNsM2F2bXB6bTAweGEzZWsyYTRrYnlqc2MifQ.fLRKfXcMPTDTtB3YafrNkA",
  },
};

module.exports = nextConfig;
