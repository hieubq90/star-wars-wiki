import Head from 'next/head'
// import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars Wiki</title>
        <meta name="description" content="Star Wars Wiki home challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>Welcome to Star Wars Wiki</h1>

        <p className={styles.description}>This is my Next.js home challenge.</p>

        <div className={styles.grid}>
          <Link href="/films">
            <a className={styles.card}>
              <h2>Films &rarr;</h2>
              <p>All of Star Wars film information</p>
            </a>
          </Link>

          <Link href="/films">
            <a href="/peoples" className={styles.card}>
              <h2>Peoples &rarr;</h2>
              <p>
                All information of person & character within the Star Wars
                universe
              </p>
            </a>
          </Link>

          <Link href="/planets">
            <a className={styles.card}>
              <h2>Planets &rarr;</h2>
              <p>All planets information</p>
            </a>
          </Link>

          <Link href="/starships">
            <a className={styles.card}>
              <h2>Starships &rarr;</h2>
              <p>All Starships information</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
