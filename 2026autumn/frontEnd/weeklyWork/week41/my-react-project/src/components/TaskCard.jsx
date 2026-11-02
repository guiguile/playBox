import { useRef, useState } from "react"

export default function TaskCard({ task, tags, onDelete, onRename, onUpdateTags,isActive, onToggle, activityDisabled, activityLoading, onMove, }) {

  const renameButtonRef = useRef(null)
  const nameInputRef = useRef(null)

  function finishEditing() {
    setEditing(false)
    requestAnimationFrame(() => renameButtonRef.current?.focus())
  }

  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState(task.name)
  const [renaming, setRenaming] = useState(false)
  const [updatingTags, setUpdatingTags] = useState(false)

  function startEditing() {
    setDraftName(task.name)
    setEditing(true)
    requestAnimationFrame(() => nameInputRef.current?.focus())
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (renaming) return

    setRenaming(true)

    try {
      const success = await onRename(task.id, draftName)
      if (success) finishEditing()
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

      const success = await onUpdateTags(task.id, remainingIds)
      if (success) {
        requestAnimationFrame(() => {
          document.getElementById(`add-tag-${task.id}`)?.focus()
        })
      }
    } finally {
      setUpdatingTags(false)
    }
  }

  return (
    <article className="card task-card" aria-label={`Task: ${task.name}`}>
      {editing ? (
        <form className="rename-form" onSubmit={handleSubmit}>
          <label htmlFor={`task-name-${task.id}`}>Task name</label>
          <input
            ref={nameInputRef}
            id={`task-name-${task.id}`}
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            disabled={renaming}
            required
          />
          <button type="submit" disabled={renaming || !draftName.trim()}>
            {renaming ? 'Updating…' : 'Update name'}
          </button>
          <button type="button" onClick={finishEditing} disabled={renaming}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="task-card__heading">
          <h2 id={`task-heading-${task.id}`} tabIndex={-1} className="task-card__title">{task.name}</h2>
          <button ref={renameButtonRef} type="button" onClick={startEditing} aria-label={`Rename ${task.name}`}>
            Rename
          </button>
        </div>
      )}

      <p className="task-card__status" role="status">
        {activityLoading ? 'Loading activity…' : isActive ? '● Active' : '○ Inactive'}
      </p>
      <button
        className="btn"
        type="button"
        onClick={() => onToggle(task.id)}
        disabled={activityDisabled}
        aria-label={`${isActive ? 'Stop' : 'Start'} ${task.name}`}
      >
        {isActive ? 'Stop' : 'Start'}
      </button>

      <ul className="task-card__tags" aria-label="Assigned tags">
        {matchingTags.map((tag) => (
          <li key={tag.id}>
            <span>{tag.name}</span>
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

      <div className="field">
        <label htmlFor={`add-tag-${task.id}`}>Add a tag</label>
        <select
          id={`add-tag-${task.id}`}
          aria-label={`Add a tag to ${task.name}`}
          value=""
          onChange={(event) => handleAddTag(event.target.value)}
          disabled={updatingTags || availableTags.length === 0}
        >
          <option value="">Choose a tag</option>
          {availableTags.map((tag) => (
            <option key={tag.id} value={String(tag.id)}>{tag.name}</option>
          ))}
        </select>
      </div>

      <div className="task-card__actions">
        <button type="button" onClick={() => onMove(task.id, -1)} aria-label={`Move up: ${task.name}`}>
          <span aria-hidden="true">↑</span> Move up
        </button>
        <button type="button" onClick={() => onMove(task.id, 1)} aria-label={`Move down: ${task.name}`}>
          <span aria-hidden="true">↓</span> Move down
        </button>
        <button className="btn btn--secondary" type="button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.name}`}>
          Delete
        </button>
      </div>
    </article>
  )
}
