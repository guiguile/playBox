import { NavLink } from 'react-router-dom'

export default function NavBar({ views }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__brand">Time Tracker</div>
      <ul className="navbar__tabs">
        {views.map((v) => (
          <li key={v.id}>
            <NavLink
              to={v.path}
              end
              className={({ isActive }) =>
                `navbar__tab navbar__tab--${v.accent}${isActive ? ' is-active' : ''}`
              }
            >
              <span aria-hidden="true">{v.icon}</span> {v.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
