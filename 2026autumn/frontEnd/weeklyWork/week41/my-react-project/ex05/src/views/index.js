import TrackerView from './TrackerView.jsx'
import HistoryView from './HistoryView.jsx'
import StatsView from './StatsView.jsx'
import AboutView from './AboutView.jsx'

// Each view: id (unique), path (URL), label (menu text), icon, accent (colour theme), component.
// To add a view later, add one entry here - the menu and layout pick it up automatically.
export const views = [
  { id: 'tracker', path: '/', label: 'Tracker', icon: '⏱️', accent: 'tracker', Component: TrackerView },
  { id: 'history', path: '/history', label: 'History', icon: '🗂️', accent: 'history', Component: HistoryView },
  { id: 'stats', path: '/stats', label: 'Statistics', icon: '📊', accent: 'stats', Component: StatsView },
  { id: 'about', path: '/info', label: 'Info', icon: 'ℹ️', accent: 'about', Component: AboutView },
]
