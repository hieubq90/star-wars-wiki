/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/Home.module.css'

const defaultEndpoint = 'https://swapi.dev/api/people/'

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

function PeoplesPage({ data }) {
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
        <title>Peoples - Star Wars Wiki</title>
        <meta name="description" content="Star Wars Wiki home challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>Peoples</h1>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Height</th>
                <th>Hair Color</th>
                <th>Eye Color</th>
                <th>Skin color</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {results.map((result) => {
                const {
                  url,
                  name,
                  gender,
                  birth_year,
                  height,
                  hair_color,
                  eye_color,
                  skin_color,
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
                    <td>{gender}</td>
                    <td>{birth_year}</td>
                    <td>{height}</td>
                    <td>{hair_color}</td>
                    <td>{eye_color}</td>
                    <td>{skin_color}</td>
                    <td>
                      <Link href={`/peoples/${peopleId}`}>
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

export default PeoplesPage
