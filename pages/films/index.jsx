/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/Home.module.css'

const defaultEndpoint = 'https://swapi.dev/api/films/'

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

function FilmsPage({ data }) {
  const { next, results: defaultResults = [] } = data
  const [results, updateResults] = useState(defaultResults)
  const [page, updatePage] = useState({
    next,
    current: defaultEndpoint,
  })

  const { current } = page

  useEffect(() => {
    if (current === defaultEndpoint) return

    async function request() {
      const res = await fetch(current)
      const nextData = await res.json()

      updatePage({
        current,
        ...nextData,
      })

      if (!nextData?.previous) {
        updateResults(nextData.results)
        return
      }

      updateResults((previous) => [...previous, ...nextData.results])
    }
    request()
  }, [current])

  return (
    <div className={styles.container}>
      <Head>
        <title>Films - Star Wars Wiki</title>
        <meta name="description" content="Star Wars Wiki home challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>Films</h1>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Producer</th>
                <th>Release Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {results.map((result) => {
                const {
                  episode_id,
                  title,
                  opening_crawl,
                  producer,
                  release_date,
                } = result
                return (
                  <tr key={episode_id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="font-bold">{title}</div>
                      </div>
                    </td>
                    <td>
                      <div className="max-w-sm truncate">{opening_crawl}</div>
                    </td>
                    <td>{producer}</td>
                    <td>{release_date}</td>
                    <th>
                      <Link href={`/films/${episode_id}`}>
                        <a className="btn btn-ghost btn-xs">details</a>
                      </Link>
                    </th>
                  </tr>
                )
              })}
            </tbody>
            <tfoot />
          </table>
        </div>
      </div>
    </div>
  )
}

export default FilmsPage
