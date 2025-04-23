/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    forceSwcTransforms: true,
    esmExternals: true,
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
