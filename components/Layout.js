import React from 'react';
import Head from 'next/head';

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>De.Vote</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous" />
        
        {/* <!-- For old IEs --> */}
        <link rel="shortcut icon" href="favicon.ico" />

        {/* <!-- For new browsers - multisize ico  --> */}
        <link rel="icon" type="image/x-icon" sizes="16x16 32x32" href="favicon.ico" />

        {/* <!-- For iPad with high-resolution Retina display running iOS ≥ 7: --> */}
        <link rel="apple-touch-icon" sizes="152x152" href="favicon-152-precomposed.png" />

        {/* <!-- For iPad with high-resolution Retina display running iOS ≤ 6: --> */}
        <link rel="apple-touch-icon" sizes="144x144" href="favicon-144-precomposed.png" />

        {/* <!-- For iPhone with high-resolution Retina display running iOS ≥ 7: --> */}
        <link rel="apple-touch-icon" sizes="120x120" href="favicon-120-precomposed.png" />

        {/* <!-- For iPhone with high-resolution Retina display running iOS ≤ 6: --> */}
        <link rel="apple-touch-icon" sizes="114x114" href="favicon-114-precomposed.png" />

        {/* <!-- For iPhone 6+ --> */}
        <link rel="apple-touch-icon" sizes="180x180" href="favicon-180-precomposed.png" />

        {/* <!-- For first- and second-generation iPad: --> */}
        <link rel="apple-touch-icon" sizes="72x72" href="favicon-72-precomposed.png" />

        {/* <!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: --> */}
        <link rel="apple-touch-icon" sizes="57x57" href="favicon-57.png" />

        {/* <!-- For Old Chrome --> */}
        <link rel="icon" sizes="32x32" href="favicon-32.png" />

        {/* <!-- For IE10 Metro --> */}
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="favicon-144.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* <!-- Chrome for Android --> */}
        <link rel="manifest" href="manifest.json" />
        <link rel="icon" sizes="192x192" href="favicon-192.png"/>
      </Head>
      <div>
        {props.children}
      </div>

    </div>
  )
}
export default Layout;