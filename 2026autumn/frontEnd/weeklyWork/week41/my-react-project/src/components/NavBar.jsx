import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar({ views }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)

  function handleKeyDown(event) {
    if (event.key === 'Escape' && menuOpen) {
      event.preventDefault()
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
  }

  function handleNavigate() {
    setMenuOpen(false)
    // A selected mobile link becomes hidden; move focus to the new view.
    if (window.matchMedia('(max-width: 600px)').matches) {
      requestAnimationFrame(() => {
        document.getElementById('main-content')?.focus()
      })
    }
  }

  return (
    <nav className="navbar" aria-label="Main navigation" onKeyDown={handleKeyDown}>
      <div className="navbar__brand">Time Tracker</div>
      <button
        ref={toggleRef}
        className="navbar__toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="navigation-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="navbar__hamburger" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <ul
        id="navigation-links"
        className={`navbar__tabs${menuOpen ? ' navbar__tabs--open' : ''}`}
      >
        {views.map((v) => (
          <li key={v.id}>
            <NavLink
              to={v.path}
              end
              onClick={handleNavigate}
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
