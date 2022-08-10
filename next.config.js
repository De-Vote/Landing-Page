/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Vote_Frontend/' : '',
  images: {
    loader: "custom",
  },
  env:{
    GHPAGE_ROUTE: process.env.GHPAGE_ROUTE
  }
}

module.exports = nextConfig
