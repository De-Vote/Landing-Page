import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
      </h1>

      <div className={styles.grid}>
        <Link href="/login" >
          <a className={styles.card}>
            <h2>Log in &rarr;</h2>
            <p>Log in as vote admin to create and edit the vote.</p>
          </a>
        </Link>

        <Link href="/menu" >
          <a className={styles.card}>
            <h2>Vote &rarr;</h2>
            <p>Log in as voter to cast votes</p>
          </a>
        </Link>

        <Link href="/result">
          <a className={styles.card}>
            <h2>Result &rarr;</h2>
            <p>Discover and see every vote result.</p>
          </a>
        </Link>

        <Link href="/">
          <a className={styles.card} style={{ visibility: "hidden" }}>
            <h2>Result &rarr;</h2>
            <p>Discover and see every vote result.</p>
          </a>
        </Link>
      </div>
    </main>
  )
}
