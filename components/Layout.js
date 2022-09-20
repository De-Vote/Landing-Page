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
      <div>
        {props.children}
      </div>

    </div>
  )
}
export default Layout;