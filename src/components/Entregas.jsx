import entregas from '../data/entregas'

function Entregas() {
  return (
    <div className="delivery-list">
      {entregas.map((entrega) => (
        <article className="delivery-item" key={`${entrega.disciplina}-${entrega.titulo}`}>
          <div>
            <span className={`status-dot ${entrega.status}`} />
            <strong>{entrega.disciplina}</strong>
          </div>
          <h4>{entrega.titulo}</h4>
          <dl>
            <div>
              <dt>Prazo</dt>
              <dd>{entrega.prazo}</dd>
            </div>
            <div>
              <dt>Formato</dt>
              <dd>{entrega.formato}</dd>
            </div>
            <div>
              <dt>Entrega</dt>
              <dd>{entrega.entrega}</dd>
            </div>
          </dl>
          <p>{entrega.observacao}</p>
        </article>
      ))}
    </div>
  )
}

export default Entregas
