import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function Home() {
  const { role, user } = useContext(AppContext);
  return (
    <main className={styles.main}>

      <div className={styles.grid}>

        {console.log(user)}
        {(!user) ? <>
          <Link href="/Vote_Frontend/login" >
            <a className={styles.card}>
              <h2>Log in &rarr;</h2>
              <p>Log in to enjoy Devote Vote system.</p>
            </a>
          </Link>
          {/* <Link href="/">
            <a className={styles.card} style={{ visibility: "hidden" }}>
              <h2>Result &rarr;</h2>
              <p>Discover and see every vote result.</p>
            </a>
          </Link> */}
        </>
          : ""}
        {(user) ? <>
          <Link href="/Vote_Frontend/menu" >
            <a className={styles.card}>
              <h2>Vote &rarr;</h2>
              {(role == "voter") ?
                <p>Enter as voter to cast votes</p> :
                <p>Enter as vote admin to create and edit the vote.</p>
              }
            </a>
          </Link>

          <Link href="/Vote_Frontend/result">
            <a className={styles.card}>
              <h2>Result &rarr;</h2>
              <p>Discover and see every vote result.</p>
            </a>
          </Link>
        </>
          : ""}

      </div>
    </main>
  )
}
