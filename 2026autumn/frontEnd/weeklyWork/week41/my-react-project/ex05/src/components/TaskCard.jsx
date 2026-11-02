import { useState } from "react"

export default function TaskCard({ task, tags, onDelete, onRename, onUpdateTags,isActive, onToggle, activityDisabled, activityLoading, onMove, }) {

  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState(task.name)
  const [renaming, setRenaming] = useState(false)
  const [updatingTags, setUpdatingTags] = useState(false)

  function startEditing() {
    setDraftName(task.name)
    setEditing(true)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (renaming) return

    setRenaming(true)

    try {
      const success = await onRename(task.id, draftName)
      if (success) setEditing(false)
    } finally {
      setRenaming(false)
    }
  }

  const tagIds=(task.tags || '')
    .split(',')
    .map((id)=>id.trim())
    .filter((id)=>id !=='')

  const matchingTags=tags.filter((tag)=>
    tagIds.includes(String(tag.id))
  )

  const availableTags = tags.filter(
  (tag) => !tagIds.includes(String(tag.id))
  )

  async function handleAddTag(tagId) {
    if (!tagId || updatingTags) return

    setUpdatingTags(true)

    try {
      await onUpdateTags(task.id, [...tagIds, tagId])
    } finally {
      setUpdatingTags(false)
    }
  }

  //remove a tag from a task
  async function handleRemoveTag(tagId) {
    if (updatingTags) return

    setUpdatingTags(true)

    try {
      const remainingIds = tagIds.filter(
        (id) => id !== String(tagId)
      )

      await onUpdateTags(task.id, remainingIds)
    } finally {
      setUpdatingTags(false)
    }
  }

  return (
    <div className="card">
    {editing ? (
      <form onSubmit={handleSubmit}>
        <label htmlFor={`task-name-${task.id}`}>Task name</label>

        <input
          id={`task-name-${task.id}`}
          className="input"
          value={draftName}
          onChange={(event) => setDraftName(event.target.value)}
          disabled={renaming}
          required
        />

        <button
          type="submit"
          disabled={renaming || !draftName.trim()}
        >
          {renaming ? 'Updating…' : 'Update name'}
        </button>

        <button
          type="button"
          onClick={() => setEditing(false)}
          disabled={renaming}
        >
          Cancel
        </button>
      </form>
    ) : (
      <>
        <h2 className="task-card__title">{task.name}</h2>
        <button type="button" onClick={startEditing}>
          Rename
        </button>
      </>
    )}

      <p role="status">
        {activityLoading
          ? 'Loading activity…'
          : isActive
            ? '● Active'
            : '○ Inactive'}
      </p>

      <button
        className="btn"
        type="button"
        onClick={() => onToggle(task.id)}
        disabled={activityDisabled}
      >
        {isActive ? 'Stop' : 'Start'}
      </button>

      <ul>
        {matchingTags.map((tag) => (
          <li key={tag.id}>
            {tag.name}{' '}

            <button
              type="button"
              onClick={() => handleRemoveTag(tag.id)}
              disabled={updatingTags}
              aria-label={`Remove ${tag.name} from ${task.name}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <label htmlFor={`add-tag-${task.id}`}>Add a tag</label>
      
      <select
        id={`add-tag-${task.id}`}
        value=""
        onChange={(event) => handleAddTag(event.target.value)}
        disabled={updatingTags || availableTags.length === 0}
      >
        <option value="">Choose a tag</option>

        {availableTags.map((tag) => (
          <option key={tag.id} value={String(tag.id)}>
            {tag.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => onMove(task.id, -1)}
        aria-label={`Move ${task.name} up`}
      >
        ↑ Move up
      </button>

      <button
        type="button"
        onClick={() => onMove(task.id, 1)}
        aria-label={`Move ${task.name} down`}
      >
        ↓ Move down
      </button>

    
    </div>
  )
}