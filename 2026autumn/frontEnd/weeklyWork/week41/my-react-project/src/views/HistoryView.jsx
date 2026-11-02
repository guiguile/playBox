import { useEffect, useState } from 'react'
import ViewHeader from '../components/ViewHeader.jsx'

const API = 'http://127.0.0.1:3010'

function toInputValue(date) {
  const pad = (value) => String(value).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function parseTimestamp(value) {
  return new Date(value.replace(' ', 'T')).getTime()
}

function displayTime(milliseconds) {
  return new Date(milliseconds).toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function buildIntervals(timestamps, taskId) {
  const events = timestamps
    .filter((entry) => String(entry.task) === String(taskId))
    .sort((a, b) =>
      a.timestamp.localeCompare(b.timestamp) ||
      Number(a.id) - Number(b.id)
    )

  const intervals = []
  let start = null

  for (const entry of events) {
    const time = parseTimestamp(entry.timestamp)
    if (!Number.isFinite(time)) continue

    if (Number(entry.type) === 0 && start === null) {
      start = { id: entry.id, time }
    } else if (Number(entry.type) === 1 && start !== null) {
      intervals.push({
        id: start.id,
        start: start.time,
        end: time,
      })

      start = null
    }
  }

  if (start !== null) {
    intervals.push({
      id: start.id,
      start: start.time,
      end: null,
    })
  }

  return intervals
}

export default function HistoryView() {
  const [tasks, setTasks] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [now, setNow] = useState(Date.now())

  const [from, setFrom] = useState(() => {
    const midnight = new Date()
    midnight.setHours(0, 0, 0, 0)
    return toInputValue(midnight)
  })

  const [to, setTo] = useState(() => toInputValue(new Date()))

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      try {
        const responses = await Promise.all([
          fetch(`${API}/tasks`),
          fetch(`${API}/timestamps`),
        ])

        if (responses.some((response) => !response.ok)) {
          throw new Error('Loading history failed.')
        }

        const [taskData, timeData] = await Promise.all(
          responses.map((response) => response.json())
        )

        if (!cancelled) {
          setTasks(taskData)
          setTimestamps(timeData)

          if (taskData.length > 0) {
            setSelectedTaskId(String(taskData[0].id))
          }
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const fromTime = new Date(from).getTime()
  const toTime = new Date(to).getTime()

  const validRange =
    Number.isFinite(fromTime) &&
    Number.isFinite(toTime) &&
    fromTime < toTime

  const intervals = validRange && selectedTaskId
    ? buildIntervals(timestamps, selectedTaskId).filter((interval) => {
        const effectiveEnd = interval.end ?? now

        return (
          interval.start < toTime &&
          effectiveEnd > fromTime &&
          effectiveEnd > interval.start
        )
      })
    : []

  return (
    <section>
      <ViewHeader
        title="History"
        subtitle="Individual activity sessions for a selected task."
      />

      <div className="card range-controls range-controls--history">
        <div className="field">
<label htmlFor="history-task">Task</label>
        <select
          id="history-task"
          className="input"
          value={selectedTaskId}
          onChange={(event) => setSelectedTaskId(event.target.value)}
          disabled={loading || tasks.length === 0}
        >
          <option value="">Choose a task</option>

          {tasks.map((task) => (
            <option key={task.id} value={String(task.id)}>
              {task.name}
            </option>
          ))}
        </select>
          </div>

        <div className="field">
<label htmlFor="history-from">From</label>
        <input
          id="history-from"
          className="input"
          type="datetime-local"
          step="1"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
        />
          </div>

        <div className="field">
<label htmlFor="history-to">To</label>
        <input
          id="history-to"
          className="input"
          type="datetime-local"
          step="1"
          value={to}
          onChange={(event) => setTo(event.target.value)}
        />
          </div>
      </div>

      {loading ? (
        <p>Loading history…</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : !validRange ? (
        <p role="alert">
          Enter a start time earlier than the end time.
        </p>
      ) : !selectedTaskId ? (
        <p>Create a task in Tracker, then return here.</p>
      ) : (
        <div className="card">
          <h2>Activity sessions</h2>

          {intervals.length === 0 ? (
            <p>No sessions overlap the selected period.</p>
          ) : (
            <ol className="session-list">
              {intervals.map((interval) => (
                <li key={interval.id}>
                  <p>
                    <strong>Started:</strong>{' '}
                    {displayTime(interval.start)}
                    <br />
                    <strong>Stopped:</strong>{' '}
                    {interval.end === null
                      ? 'Still active'
                      : displayTime(interval.end)}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </section>
  )
}