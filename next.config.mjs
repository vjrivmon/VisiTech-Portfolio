/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages configuration
  output: 'export',
  basePath: '/VisiTech-Portfolio',

  // Image optimization for static export
  images: {
    unoptimized: true, // Required for static export
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // SWC minification
  swcMinify: true,

  // React strict mode
  reactStrictMode: true,

  // Power by header
  poweredByHeader: false,

  // Compression
  compress: true,
};

export default nextConfig;
