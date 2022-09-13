const { i18n } = require('./next-i18next.config');
/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production';
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  // assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  images: {
    loader: "custom",
  },
  env:{
    API_URL: process.env.API_URL,
    INVITATION_URL: process.env.INVITATION_URL
  }
}

module.exports = nextConfig
