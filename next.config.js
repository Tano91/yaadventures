/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: 
    [
      {
        protocol: 'https',
        hostname: 'cloudinary.com',      
      },
      {
        protocol: 'https',
        hostname:'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'links.papareact.com'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      },
      {
        protocol: 'https',
        hostname: 'commons.wikimedia.org'
      }
    ]
  }
}

module.exports = nextConfig
