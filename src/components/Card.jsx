function Card({ titulo, children }) {
  return (
    <article className="card">
      <h3>{titulo}</h3>
      {children}
    </article>
  )
}

export default Card