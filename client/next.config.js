/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/account123/**',
          },
        ],
        domains:[
          'res.cloudinary.com',
        ]
      },
}

module.exports = nextConfig
