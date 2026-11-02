import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import { views } from './views/index.js'
import './App.css'
import TrackerView from './views/TrackerView.jsx'
import HistoryView from './views/HistoryView.jsx'
import StatsView from './views/StatsView.jsx'
import AboutView from './views/AboutView.jsx'

export default function App() {
  const { pathname } = useLocation()
  const active = views.find((v) => v.path === pathname) ?? views[0]

  return (
    <div className={`app app--${active.accent}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <NavBar views={views} />
      <main id="main-content" tabIndex={-1} className="app__content">
        <Routes>
          <Route index element={<TrackerView />} />
          <Route path="/info" element={<AboutView />} />
          <Route path="/history" element={<HistoryView />} />
          <Route path="/stats" element={<StatsView />} />
        </Routes>
      </main>
      <footer className="app__footer">Time Tracker · record and analyse your time</footer>
    </div>
  )
}


