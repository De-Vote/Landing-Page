import '../styles/globals.css'
import React, { useEffect, useState } from "react";
import AppContext from '../context/AppContext';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {Alert, Navbar,Nav} from 'react-bootstrap'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [result, setResult] = useState(null)

  return (
    <AppContext.Provider value={{
      user: user,
      setUser: setUser
    }}>
      <Head>
        <title>De.Vote</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous" />
      </Head>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={"/devotelogo.png"}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Devote
        </Navbar.Brand>
        <Nav>
        <Nav.Item style={{marginRight:"10%"}}>
          <a href="/login" style={{color: "white"}}>Login</a>
        </Nav.Item>
        <Nav.Item>
          <a href="/menu" style={{color: "white"}}>Vote</a>
        </Nav.Item>
        </Nav>
      </Navbar>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
