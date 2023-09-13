import { Html, Head, Main, NextScript } from 'next/document'
import { assetPath } from '../lib/publicPath'
import i18nextConfig from '../next-i18next.config'
export default function Document(props) {
  const currentLocale = props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale
  const title = "De.Vote App"
  const description = "Best De.Vote App in the world"
  const url= "https://devote.tw"
  return (
    <Html lang={currentLocale}>
      <Head>
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="description" content={description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={assetPath("favicon-192.webp")} />
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content={url}/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={assetPath("favicon-192.webp")} />
        <meta name="twitter:url" content={url} />

        {/* <!-- For old IEs --> */}
        <link rel="shortcut icon" href={assetPath("/favicon.ico")} />

        {/* <!-- For new browsers - multisize ico  --> */}
        <link rel="icon" type="image/x-icon" sizes="16x16 32x32" href={assetPath("/favicon.ico")} />

        {/* <!-- For iPad with high-resolution Retina display running iOS ≥ 7: --> */}
        <link rel="apple-touch-icon" sizes="152x152" href={assetPath("/favicon-152-precomposed.webp")} />

        {/* <!-- For iPad with high-resolution Retina display running iOS ≤ 6: --> */}
        <link rel="apple-touch-icon" sizes="144x144" href={assetPath("/favicon-144-precomposed.webp")} />

        {/* <!-- For iPhone with high-resolution Retina display running iOS ≥ 7: --> */}
        <link rel="apple-touch-icon" sizes="120x120" href={assetPath("/favicon-120-precomposed.webp")} />

        {/* <!-- For iPhone with high-resolution Retina display running iOS ≤ 6: --> */}
        <link rel="apple-touch-icon" sizes="114x114" href={assetPath("/favicon-114-precomposed.webp")} />

        {/* <!-- For iPhone 6+ --> */}
        <link rel="apple-touch-icon" sizes="180x180" href={assetPath("/favicon-180-precomposed.webp")} />

        {/* <!-- For first- and second-generation iPad: --> */}
        <link rel="apple-touch-icon" sizes="72x72" href={assetPath("/favicon-72-precomposed.webp")} />

        {/* <!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: --> */}
        <link rel="apple-touch-icon" sizes="57x57" href={assetPath("/favicon-57.webp")} />

        {/* <!-- For Old Chrome --> */}
        <link rel="icon" sizes="32x32" href={assetPath("/favicon-32.webp")} />

        {/* <!-- For IE10 Metro --> */}
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content={assetPath("/favicon-144-precomposed.webp")} />
        <meta name="theme-color" content="#ffffff" />

        {/* <!-- Chrome for Android --> */}
        <link rel="manifest" href={assetPath("/manifest.json")} />
        <link rel="icon" sizes="192x192" href={assetPath("/favicon-192.webp")}/>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous" />
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" 
          rel="stylesheet"  
          type='text/css'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}