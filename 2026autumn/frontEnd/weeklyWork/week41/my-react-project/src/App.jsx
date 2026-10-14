import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import { views } from './views/index.js'
import './App.css'

export default function App() {
  const { pathname } = useLocation()
  const active = views.find((v) => v.path === pathname) ?? views[0]

  return (
    <div className={`app app--${active.accent}`}>
      <NavBar views={views} />
      <main className="app__content">
        <Routes>
          {views.map(({ id, path, Component }) => (
            <Route key={id} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="app__footer">Time Tracker · record and analyse your time</footer>
    </div>
  )
}
