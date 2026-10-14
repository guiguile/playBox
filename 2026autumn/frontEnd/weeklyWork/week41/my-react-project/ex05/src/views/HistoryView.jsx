import ViewHeader from '../components/ViewHeader.jsx'

// Placeholder - will list recorded time entries.
export default function HistoryView() {
  return (
    <section>
      <ViewHeader title="History" subtitle="All recorded time entries." />
      <div className="card">
        <table className="table">
          <thead>
            <tr><th>Activity</th><th>Start</th><th>End</th><th>Duration</th></tr>
          </thead>
          <tbody>
            <tr><td colSpan="4" className="muted center">No entries yet</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
