import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
        <h1 className={styles.title}>
        </h1>

        <div className={styles.grid}>
          <a href="/login" className={styles.card}>
            <h2>Log in &rarr;</h2>
            <p>Log in as vote admin to create and edit the vote.</p>
          </a>

          <a href="/menu" className={styles.card}>
            <h2>Vote &rarr;</h2>
            <p>Log in as voter to cast a vote</p>
          </a>

          <a
            href="/result"
            className={styles.card}
          >
            <h2>Result &rarr;</h2>
            <p>Discover and see every vote result.</p>
          </a>

          <a
            href="/"
            className={styles.card}
            style={{visibility: "hidden"}}
          >
            <h2>Others &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
    </main>
  )
}
