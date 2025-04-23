/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    // Improve process signal handling
    forceSwcTransforms: true,
    esmExternals: true,
  },
  // Custom server configuration
  onDemandEntries: {
    // Improve development server stability
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
