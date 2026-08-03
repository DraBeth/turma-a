function Card({ titulo, children, className = '' }) {
  return (
    <article className={`card ${className}`.trim()}>
      <h3>{titulo}</h3>
      {children}
    </article>
  )
}

export default Card
