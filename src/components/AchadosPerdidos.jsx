import achados from '../data/achados'

function AchadosPerdidos() {
  const ultimoItem = achados[0]

  return (
    <div className="lost-found">
      <span className={`tag ${ultimoItem.status}`}>{ultimoItem.status}</span>
      <h4>{ultimoItem.item}</h4>
      <p>{ultimoItem.local}</p>
      <small>{ultimoItem.data}</small>
      <p>{ultimoItem.observacao}</p>
    </div>
  )
}

export default AchadosPerdidos
