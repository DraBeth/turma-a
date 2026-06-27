import entregas from '../data/entregas'

const formatarData = (dataIso) => {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

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
          <div className="source-row">
            <span>Fonte: {entrega.fonte}</span>
            <span>Atualizado em: {formatarData(entrega.atualizadoEm)}</span>
            <span>Por: {entrega.atualizadoPor}</span>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Entregas
