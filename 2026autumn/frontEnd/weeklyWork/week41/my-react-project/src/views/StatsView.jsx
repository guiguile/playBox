import ViewHeader from '../components/ViewHeader.jsx'

// Placeholder - will show time-usage analysis.
export default function StatsView() {
  return (
    <section>
      <ViewHeader title="Statistics" subtitle="How your time is being used." />
      <div className="grid">
        <div className="card stat"><span className="stat__value">0 h</span><span className="muted">Total tracked</span></div>
        <div className="card stat"><span className="stat__value">–</span><span className="muted">Most used activity</span></div>
        <div className="card stat"><span className="stat__value">0</span><span className="muted">Entries</span></div>
      </div>
      <div className="card chart-placeholder">Chart area</div>
    </section>
  )
}
