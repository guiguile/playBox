import ViewHeader from '../components/ViewHeader.jsx'

// Placeholder - Module B (author, instructions, content licences) goes here.
export default function AboutView() {
  return (
    <section>
      <ViewHeader title="Info" subtitle="About this application." />
      <div className="card">
        <p className="muted">Author, usage instructions and content/licence information will be added here.</p>
      </div>
    </section>
  )
}
