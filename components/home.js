import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { role, user } = useContext(AppContext);
  return (
    <main className={styles.main}>

      <div className={styles.grid}>
        {(!user) ? <>
          <Link href="/login" as={"/Vote_Frontend/login"}>
            <a className={styles.card}>
              <h2>Log in &rarr;</h2>
              <p>Log in to enjoy Devote Vote system.</p>
            </a>
          </Link>
          <Link href="/register" as={"/Vote_Frontend/register"}>
            <a className={styles.card}>
              <h2>Register &rarr;</h2>
              <p>Create an account to become a vote admin</p>
            </a>
          </Link>
        </>
          : ""}
        {(user) ? <>
          {/* <Link href="menu" as={"Vote_Frontend/menu"}> */}
            <a className={styles.card} onClick={(e)=>{e.preventDefault(); router.push("/menu", "/Vote_Frontend/menu")}}>
              <h2>Vote &rarr;</h2>
              {(role == "voter") ?
                <p>Enter as voter to cast votes</p> :
                <p>Enter as vote admin to create and edit the vote.</p>
              }
            </a>
          {/* </Link> */}

          <Link href="result" as={"Vote_Frontend/result"}>
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
