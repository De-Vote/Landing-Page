/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  images: {
    loader: "custom",
  },
  env:{
    GHPAGE_ROUTE: process.env.GHPAGE_ROUTE
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh_hant'],
},
}

module.exports = nextConfig
