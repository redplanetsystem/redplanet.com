/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // PROFESSIONAL GRADE: Enforce strict type safety for production readiness.
  // No hidden shortcuts or silent type failures.
  typescript: {
    ignoreBuildErrors: false,
  },

  // Elite Image Pipeline: Allowlist trusted external storage and media origins.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.nasa.gov',
      },
      // Add your production deployment cloud storage bucket domain here later (e.g., Vercel Blob or AWS S3)
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // High-Performance Asset Delivery & Security Headers
  compress: true,
  poweredByHeader: false, // Strips Next.js footprint for security obfuscation

  experimental: {
    serverActions: {
      bodySizeLimit: '4mb', // Increased slightly to accommodate rich media/audio payloads from Command Center uploads
    },
  },

  // Tesla & Apple Standard Security Shield & Permissions Policy
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Updated to allow microphone streams for the AI voice & audio command layer
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(self), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;