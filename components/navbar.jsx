import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <a id="nav_link_index" className="btn btn-ghost normal-case text-xl">
            Star Wars
          </a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/films">
              <a id="nav_link_films">Films</a>
            </Link>
          </li>
          <li>
            <Link href="/peoples">
              <a id="nav_link_peoples">Peoples</a>
            </Link>
          </li>
          <li>
            <Link href="/planets">
              <a id="nav_link_planets">Planets</a>
            </Link>
          </li>
          <li>
            <Link href="/starships">
              <a id="nav_link_starships">Starships</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
