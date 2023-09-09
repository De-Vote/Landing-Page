// const { i18n } = require('./next-i18next.config');
/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production';
const nextConfig = {
  // i18n,
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${process.env.GHPAGE_ROUTE}` : '',
  images: {
    loader: "custom",
  },
  env:{
    GHPAGE_ROUTE: process.env.GHPAGE_ROUTE,
    API_URL: process.env.API_URL

  }
}

module.exports =(nextConfig)