// const { i18n } = require('./next-i18next.config');
const path = require('path');
/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production';
const nextConfig = {
  // i18n,
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  images: {
    loader: "custom",
  },
  env:{
    // if dev use this 
    // GHPAGE_ROUTE: process.env.NODE_ENV === 'production' ? `/Landing-Page` : '',
    // if production use this
    GHPAGE_ROUTE: '',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports =(nextConfig)