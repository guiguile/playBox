import { useEffect, useState } from 'react'
import ViewHeader from '../components/ViewHeader.jsx'

const API = 'http://127.0.0.1:3010'


// Format a local date for a datetime-local input.
function toInputValue(date) {
  const pad = (value) => String(value).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

// The API's timestamps represent local time.
function parseTimestamp(value) {
  return new Date(value.replace(' ', 'T')).getTime()
}

function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  return `${hours} h ${minutes} min ${seconds % 60} s`
}

function calculateTaskTime(taskId, timestamps, from, to, now) {
  const events = timestamps
    .filter((entry) => String(entry.task) === String(taskId))
    .sort((a, b) =>
      a.timestamp.localeCompare(b.timestamp) ||
      Number(a.id) - Number(b.id)
    )

  let startedAt = null
  let total = 0

  function overlap(start, end) {
    return Math.max(
      0,
      Math.min(end, to, now) - Math.max(start, from)
    )
  }

  for (const entry of events) {
    const time = parseTimestamp(entry.timestamp)
    if (!Number.isFinite(time)) continue

    if (Number(entry.type) === 0 && startedAt === null) {
      startedAt = time
    } else if (Number(entry.type) === 1 && startedAt !== null) {
      total += overlap(startedAt, time)
      startedAt = null
    }
  }

  // An unmatched start means the task is still active.
  if (startedAt !== null) {
    total += overlap(startedAt, now)
  }

  return total
}

function calculateTagTime(tagId, tasks, timestamps, from, to, now) {
  const relatedTasks = tasks.filter((task) =>
    (task.tags || '')
      .split(',')
      .map((id) => id.trim())
      .includes(String(tagId))
  )

  const intervals = []

  function addInterval(start, end) {
    const clippedStart = Math.max(start, from)
    const clippedEnd = Math.min(end, to, now)

    if (clippedEnd > clippedStart) {
      intervals.push([clippedStart, clippedEnd])
    }
  }

  for (const task of relatedTasks) {
    const events = timestamps
      .filter((entry) => String(entry.task) === String(task.id))
      .sort((a, b) =>
        a.timestamp.localeCompare(b.timestamp) ||
        Number(a.id) - Number(b.id)
      )

    let start = null

    for (const entry of events) {
      const time = parseTimestamp(entry.timestamp)
      if (!Number.isFinite(time)) continue

      if (Number(entry.type) === 0 && start === null) {
        start = time
      } else if (Number(entry.type) === 1 && start !== null) {
        addInterval(start, time)
        start = null
      }
    }

    if (start !== null) addInterval(start, now)
  }

  intervals.sort((a, b) => a[0] - b[0])

  let total = 0
  let mergedStart = null
  let mergedEnd = null

  for (const [start, end] of intervals) {
    if (mergedStart === null) {
      mergedStart = start
      mergedEnd = end
    } else if (start <= mergedEnd) {
      mergedEnd = Math.max(mergedEnd, end)
    } else {
      total += mergedEnd - mergedStart
      mergedStart = start
      mergedEnd = end
    }
  }

  if (mergedStart !== null) total += mergedEnd - mergedStart

  return total
}

export default function StatsView() {

  const [tags, setTags] = useState([])

  const [tagFrom, setTagFrom] = useState(() => {
    const midnight = new Date()
    midnight.setHours(0, 0, 0, 0)
    return toInputValue(midnight)
  })

  const [tagTo, setTagTo] = useState(() => toInputValue(new Date()))

  const [tasks, setTasks] = useState([])
  const [timestamps, setTimestamps] = useState([])
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
          fetch(`${API}/tags`),
        ])

        if (responses.some((response) => !response.ok)) {
          throw new Error('Loading statistics failed.')
        }

        const [taskData, timeData, tagData] = await Promise.all(
          responses.map((response) => response.json())
        )

        if (!cancelled) {
          setTasks(taskData)
          setTimestamps(timeData)
          setTags(tagData)
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

  const summary = validRange
    ? tasks
        .map((task) => ({
          id: task.id,
          name: task.name,
          duration: calculateTaskTime(
            task.id,
            timestamps,
            fromTime,
            toTime,
            now
          ),
        }))
        .filter((task) => task.duration > 0)
    : []

    const tagFromTime = new Date(tagFrom).getTime()
    const tagToTime = new Date(tagTo).getTime()

    const validTagRange =
      Number.isFinite(tagFromTime) &&
      Number.isFinite(tagToTime) &&
      tagFromTime < tagToTime

    const tagSummary = validTagRange
      ? tags
          .map((tag) => ({
            id: tag.id,
            name: tag.name,
            duration: calculateTagTime(
              tag.id,
              tasks,
              timestamps,
              tagFromTime,
              tagToTime,
              now
            ),
          }))
          .filter((tag) => tag.duration > 0)
      : []

  return (
    <section>
      <ViewHeader
        title="Statistics"
        subtitle="Task activity during the selected period."
      />

      <div className="card">
        <label htmlFor="summary-from">From</label>
        <input
          id="summary-from"
          className="input"
          type="datetime-local"
          step="1"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
        />

        <label htmlFor="summary-to">To</label>
        <input
          id="summary-to"
          className="input"
          type="datetime-local"
          step="1"
          value={to}
          onChange={(event) => setTo(event.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading statistics…</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : !validRange ? (
        <p role="alert">
          Enter a start time earlier than the end time.
        </p>
      ) : (
        <div className="card">
          <h2>Time per task</h2>

          {summary.length === 0 ? (
            <p>No task activity during this period.</p>
          ) : (
            <ul>
              {summary.map((task) => (
                <li key={task.id}>
                  <strong>{task.name}</strong>
                  {' — '}
                  {formatDuration(task.duration)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {!loading && !error && (
        <div className="card">
          <h2>Time per tag</h2>

          <label htmlFor="tag-summary-from">From</label>
          <input
            id="tag-summary-from"
            className="input"
            type="datetime-local"
            step="1"
            value={tagFrom}
            onChange={(event) => setTagFrom(event.target.value)}
          />

          <label htmlFor="tag-summary-to">To</label>
          <input
            id="tag-summary-to"
            className="input"
            type="datetime-local"
            step="1"
            value={tagTo}
            onChange={(event) => setTagTo(event.target.value)}
          />

          {!validTagRange ? (
            <p role="alert">
              Enter a start time earlier than the end time.
            </p>
          ) : tagSummary.length === 0 ? (
            <p>No tag activity during this period.</p>
          ) : (
            <ul>
              {tagSummary.map((tag) => (
                <li key={tag.id}>
                  <strong>{tag.name}</strong>
                  {' — '}
                  {formatDuration(tag.duration)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}