/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/Home.module.css'

const defaultEndpoint = 'https://swapi.dev/api/starships/'

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

function StarShipsPage({ data }) {
  const { next, results: defaultResults = [] } = data
  const [results, updateResults] = useState(defaultResults)
  const [page, updatePage] = useState({
    next,
    current: defaultEndpoint,
    previous: null,
  })

  const { current } = page

  useEffect(() => {
    if (current === defaultEndpoint) return

    async function request() {
      const res = await fetch(current)
      const nextData = await res.json()

      updatePage({
        current,
        previous: nextData.previous,
        next: nextData.next,
      })

      updateResults(nextData.results)
    }
    request()
  }, [current])

  function prevPage() {
    updatePage((previous) => ({
      ...previous,
      current: page.previous,
    }))
  }

  function nextPage() {
    updatePage((previous) => ({
      ...previous,
      current: page.next,
    }))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Star Ships - Star Wars Wiki</title>
        <meta name="description" content="Star Wars Wiki home challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>Star Ships</h1>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Class</th>
                <th>Passengers</th>
                <th>Cargo Capacity</th>
                <th>Cost In Credits</th>
                <th>Max Atmosphering Speed</th>
                <th>Hyperdrive Rating</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {results.map((result) => {
                const {
                  url,
                  name,
                  model,
                  starship_class,
                  passengers,
                  cargo_capacity,
                  cost_in_credits,
                  max_atmosphering_speed,
                  hyperdrive_rating,
                } = result
                const tmp = url.split('/')
                const peopleId = tmp[tmp.length - 2]
                return (
                  <tr key={url}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="font-bold">{name}</div>
                      </div>
                    </td>
                    <td>{model}</td>
                    <td>{starship_class}</td>
                    <td>{passengers}</td>
                    <td>{cargo_capacity}</td>
                    <td>{cost_in_credits}</td>
                    <td>{max_atmosphering_speed}</td>
                    <td>{hyperdrive_rating}</td>
                    <td>
                      <Link href={`/starships/${peopleId}`}>
                        <a className="btn btn-ghost btn-xs">details</a>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="8">
                  <div className="flex justify-center">
                    <div className="max-w-sm btn-group grid grid-cols-2">
                      {page?.previous ? (
                        <button className="btn btn-outline" onClick={prevPage}>
                          Previous page
                        </button>
                      ) : null}
                      {page?.next ? (
                        <button className="btn btn-outline" onClick={nextPage}>
                          Next
                        </button>
                      ) : null}
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StarShipsPage
