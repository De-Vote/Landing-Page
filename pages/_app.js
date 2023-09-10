import '../styles/globals.css'
import React from "react";
import '../styles/header.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appWithTranslation } from 'next-i18next';
import SSRProvider from 'react-bootstrap/SSRProvider';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SSRProvider>
    {getLayout( <>
        <ToastContainer position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
        {/* <Component {...pageProps} /> */}
        <Component {...pageProps} /></>)}
      </SSRProvider>
  )
}

export default appWithTranslation(MyApp)
