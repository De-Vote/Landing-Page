const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh_hant'],
        localePath: path.resolve('./public/locales')
      },
  };