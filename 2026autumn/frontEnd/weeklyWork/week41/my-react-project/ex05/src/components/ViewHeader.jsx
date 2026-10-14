export default function ViewHeader({ title, subtitle }) {
  return (
    <header className="view-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}
