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
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-E3JR90S2N3"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-E3JR90S2N3');
      </script>
      <div>
        {props.children}
      </div>

    </div>
  )
}
export default Layout;