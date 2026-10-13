import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const LIENS = [
  { chemin: '/parsing', libelle: 'Analyse de CV' },
  { chemin: '/assistant', libelle: 'Assistant RH' },
  { chemin: '/chat', libelle: 'Agent de recrutement' },
]

function Layout() {
  return (
    <>
      <header className="layout-header">
        <div className="layout-header__contenu">
          <p className="layout-header__titre">RH Copilot</p>
          <nav aria-label="Navigation principale">
            <ul className="layout-nav">
              {LIENS.map(({ chemin, libelle }) => (
                <li key={chemin}>
                  <NavLink
                    to={chemin}
                    className={({ isActive }) =>
                      isActive ? 'layout-nav__lien layout-nav__lien--actif' : 'layout-nav__lien'
                    }
                  >
                    {libelle}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
