import React from 'react';
import Head from 'next/head';
import Script from 'next/script'

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>De.Vote 塊區投科技股份有限公司</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>
      {/* <!-- Global site tag (gtag.js) - Google Analytics */}
      {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=G-E3JR90S2N3"></Script>
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-E3JR90S2N3');
          `}</Script> */}
      <div>
        {props.children}
      </div>

    </div>
  )
}
export default Layout;