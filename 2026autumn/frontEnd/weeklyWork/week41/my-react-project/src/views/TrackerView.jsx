import ViewHeader from '../components/ViewHeader.jsx'
import { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard.jsx'

// Load and manage tasks, tags and activity through the supplied API.
export default function TrackerView() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')
  const [tags, setTags] = useState([])
  const [newTagName, setNewTagName] = useState('')
  const [creatingTag, setCreatingTag] = useState(false)
  const [timestamps, setTimestamps] = useState([])
  const [loadingActivity, setLoadingActivity] = useState(true)
  const [savingActivity, setSavingActivity] = useState(false)
  const [selectedTagIds, setSelectedTagIds] = useState([])

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch('http://127.0.0.1:3010/tasks')

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }

        const data = await response.json()
        setTasks(data)

        const tagsResponse = await fetch('http://127.0.0.1:3010/tags')
        
        if (!tagsResponse.ok) {
          throw new Error(`Tag request failed: ${tagsResponse.status}`)
        }
        
        const tagsData = await tagsResponse.json()
        setTags(tagsData)

        const timesResponse = await fetch('http://127.0.0.1:3010/timestamps')

        if (!timesResponse.ok) {
          throw new Error('Loading activity timestamps failed.')
        }

        setTimestamps(await timesResponse.json())
        setLoadingActivity(false)
      } catch (err) {
        setError(err.message)
      }
    }
    loadTasks()
      
  }, [])

  const [newTaskName, setNewTaskName] = useState('')
  const [saving, setSaving] = useState(false)
  async function handleAddTask(event) {
    event.preventDefault()

    const name = newTaskName.trim()
    if (!name || saving) return

    setSaving(true)
    setError('')

    try {
      const response = await fetch('http://127.0.0.1:3010/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          tags: '',
          additional_data: '',
        }),
      })

      if (!response.ok) {
        throw new Error(`Creating task failed: ${response.status}`)
      }

      setNewTaskName('')

      // Read the updated task list from the server.
      const tasksResponse = await fetch('http://127.0.0.1:3010/tasks')

      if (!tasksResponse.ok) {
        throw new Error('Task created, but refreshing the list failed.')
      }

      const updatedTasks = await tasksResponse.json()
      setTasks(updatedTasks)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteTask(taskId) {
  setError('')

    try {
      const response = await fetch(
        `http://127.0.0.1:3010/tasks/${taskId}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error(`Deleting task failed: ${response.status}`)
      }

      const index = tasks.findIndex((task) => task.id === taskId)
      const neighbour = tasks[index + 1] || tasks[index - 1]
      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== taskId)
      )
      // Keep keyboard focus in a useful place after its Delete button disappears.
      requestAnimationFrame(() => {
        const heading = neighbour && document.getElementById(`task-heading-${neighbour.id}`)
        if (heading) heading.focus()
        else document.getElementById('new-task-name')?.focus()
      })
    } catch (err) {
      setError(err.message)
    }
  }

  //rename a task preserves its tags
  async function handleRenameTask(taskId, newName) {
  const name = newName.trim()
    if (!name) return false

    setError('')

    try {
      const response = await fetch(
        `http://127.0.0.1:3010/tasks/${taskId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        }
      )

      if (!response.ok) {
        throw new Error(`Renaming task failed: ${response.status}`)
      }

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId ? { ...task, name } : task
        )
      )

      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  async function handleUpdateTags(taskId, tagIds) {
    const tagsValue = tagIds.join(',')
    setError('')

    try {
      const response = await fetch(
        `http://127.0.0.1:3010/tasks/${taskId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tags: tagsValue }),
        }
      )

      if (!response.ok) {
        throw new Error(`Updating tags failed: ${response.status}`)
      }

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskId ? { ...task, tags: tagsValue } : task
        )
      )

      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  //create a new tag. This follows the same pattern as adding a task: POST the new item, GET the updated list, update state.
  async function handleCreateTag(event) {
    event.preventDefault()

    const name = newTagName.trim()
    if (!name || creatingTag) return

    if (tags.some((tag) => tag.name === name)) {
      setError('That tag already exists. Select it from a task’s dropdown.')
      return
    }

    setCreatingTag(true)
    setError('')

    try {
      const response = await fetch('http://127.0.0.1:3010/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          additional_data: '',
        }),
      })

      if (!response.ok) {
        throw new Error(`Creating tag failed: ${response.status}`)
      }

      setNewTagName('')

      const tagsResponse = await fetch('http://127.0.0.1:3010/tags')

      if (!tagsResponse.ok) {
        throw new Error('Tag created, but refreshing the tag list failed.')
      }

      const updatedTags = await tagsResponse.json()
      setTags(updatedTags)
    } catch (err) {
      setError(err.message)
    } finally {
      setCreatingTag(false)
    }
  }

  function isTaskActive(taskId) {
    const taskTimes = timestamps
      .filter((entry) => String(entry.task) === String(taskId))
      .sort((a, b) =>
        a.timestamp.localeCompare(b.timestamp) ||
        Number(a.id) - Number(b.id)
      )

    const latest = taskTimes[taskTimes.length - 1]

    // Type 0 means start; type 1 means stop.
    return latest !== undefined && Number(latest.type) === 0
  }

  function getLocalTimestamp() {
    const now = new Date()
    const pad = (value, length = 2) =>
      String(value).padStart(length, '0')

    const date = [
      now.getFullYear(),
      pad(now.getMonth() + 1),
      pad(now.getDate()),
    ].join('-')

    const time = [
      pad(now.getHours()),
      pad(now.getMinutes()),
      pad(now.getSeconds()),
    ].join(':')

    return `${date} ${time}.${pad(now.getMilliseconds(), 3)}`
  }

  async function handleToggleTask(taskId) {
    if (loadingActivity || savingActivity) return

    setSavingActivity(true)
    setError('')

    try {
      const response = await fetch(
        'http://127.0.0.1:3010/timestamps',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: getLocalTimestamp(),
            task: taskId,
            type: isTaskActive(taskId) ? 1 : 0,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Changing activity failed: ${response.status}`)
      }

      // Reload the saved timestamps to determine the current statuses.
      setLoadingActivity(true)

      const timesResponse = await fetch(
        'http://127.0.0.1:3010/timestamps'
      )

      if (!timesResponse.ok) {
        throw new Error(
          'Activity saved, but reloading its status failed. Reload the page.'
        )
      }

      setTimestamps(await timesResponse.json())
      setLoadingActivity(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingActivity(false)
    }
  }

  function handleFilterChange(tagId) {
    const id = String(tagId)

    setSelectedTagIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((existingId) => existingId !== id)
        : [...previousIds, id]
    )
  }

  const filteredTasks = tasks.filter((task) => {
    const taskTagIds = (task.tags || '')
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '')

    return selectedTagIds.every((id) => taskTagIds.includes(id))
  })

  function handleMoveTask(taskId, direction) {
    setTasks((previousTasks) => {
      const index = previousTasks.findIndex(
        (task) => task.id === taskId
      )

      const targetIndex = index + direction

      if (
        index === -1 ||
        targetIndex < 0 ||
        targetIndex >= previousTasks.length
      ) {
        return previousTasks
      }

      const reorderedTasks = [...previousTasks]

      const movedTask = reorderedTasks.splice(index, 1)[0]
      reorderedTasks.splice(targetIndex, 0, movedTask)

      return reorderedTasks
    })
  }

  return (
    <section>
      <ViewHeader title="Tracker" subtitle="Start and stop activities here." />
      {error && <p role="alert">Error: {error}</p>}

      <div className="creation-forms">
      <form className="create-form" onSubmit={handleAddTask}>
        <label htmlFor="new-task-name">New task name </label>
        
        <input
          id="new-task-name"
          className="input"
          value={newTaskName}
          onChange={(event) => setNewTaskName(event.target.value)}
          disabled={saving}
          required
        />

        <button
          className="btn"
          type="submit"
          disabled={saving || !newTaskName.trim()}
        >
          {saving ? 'Adding…' : 'Add task'}
        </button>
      </form>

      <form className="create-form" onSubmit={handleCreateTag}>
        <label htmlFor="new-tag-name">New tag name </label>

        <input
          id="new-tag-name"
          className="input"
          value={newTagName}
          onChange={(event) => setNewTagName(event.target.value)}
          disabled={creatingTag}
          required
        />

        <button
          className="btn"
          type="submit"
          disabled={creatingTag || !newTagName.trim()}
        >
          {creatingTag ? 'Creating…' : 'Create tag'}
        </button>
      </form>

      </div>

      <fieldset className="filter-panel">
        <legend>Filter tasks by tags</legend>

        <div className="filter-options">
        {tags.map((tag) => (
          <label key={tag.id} className="filter-option">
            <input
              type="checkbox"
              checked={selectedTagIds.includes(String(tag.id))}
              onChange={() => handleFilterChange(tag.id)}
            />
            <span>{tag.name}</span>
          </label>
        ))}

        </div>
        <button
          type="button"
          onClick={() => setSelectedTagIds([])}
          disabled={selectedTagIds.length === 0}
        >
          Clear filters
        </button>
      </fieldset>

      <p id="task-count" role="status">{filteredTasks.length} task(s) shown</p>

      <div className="task-grid" aria-describedby="task-count">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} tags={tags} 
          onDelete={handleDeleteTask} 
          onRename={handleRenameTask} 
          onUpdateTags={handleUpdateTags}
          isActive={isTaskActive(task.id)}
          onToggle={handleToggleTask}
          activityDisabled={loadingActivity || savingActivity} 
          activityLoading={loadingActivity}
          onMove={handleMoveTask} />
        ))}
      </div>
  
    </section>
  )
}
