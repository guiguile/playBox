import ViewHeader from '../components/ViewHeader.jsx'

export default function AboutView() {
  return (
    <section>
      <ViewHeader title="Info" subtitle="About this application." />
      <div className="card">
        <h2>Author</h2>
        <p>TG Le</p>

        <h2>How to use</h2>
        <p>
          Create tasks and use Start and Stop to record activity.
          Multiple tasks can be active simultaneously.
          Rename or delete tasks using their card controls.
        </p>
        <p>
          Create tags, then select them from a task’s dropdown.
          Remove a tag using its Remove button.
          Use the tag filters to narrow the displayed tasks.
          Changes are saved automatically to the backend.
        </p>

        <h2>Content and licenses</h2>
        <p>
          No external photographs, illustrations, or other media
          assets are used. Navigation symbols are Unicode emoji
          displayed by the device.
        </p>
      </div>
    </section>
  )
}
