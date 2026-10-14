import ViewHeader from '../components/ViewHeader.jsx'

// Placeholder - the real start/stop logic comes in a later module.
export default function TrackerView() {
  return (
    <section>
      <ViewHeader title="Tracker" subtitle="Start and stop activities here." />
      <div className="card tracker-clock">
        <div className="tracker-clock__time">00:00:00</div>
        <p className="muted">No activity running</p>
        <div className="row">
          <input className="input" placeholder="Activity name (e.g. Sleeping, Project X)" disabled />
          <button className="btn" disabled>Start</button>
          <button className="btn btn--secondary" disabled>Stop</button>
        </div>
      </div>
    </section>
  )
}
