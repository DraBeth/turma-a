import disciplinas from '../data/disciplinas'
import contatos from '../data/contatos'

function Disciplinas() {
  return (
    <div className="subjects">
      <div className="subjects-summary">
        <div>
          <span>Período letivo</span>
          <strong>2026.2</strong>
        </div>
        <div>
          <span>Início previsto</span>
          <strong>17/08/2026</strong>
        </div>
        <div>
          <span>Disciplinas</span>
          <strong>{disciplinas.length}</strong>
        </div>
      </div>

      <div className="subject-list">
        {disciplinas.map((disciplina, index) => {
          const contato = contatos.find((item) => item.nome === disciplina.professor)

          return (
            <article className="subject-item" key={disciplina.nome}>
              <span className="subject-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="subject-copy">
                <h4>{disciplina.nome}</h4>
                <p>
                  <span>Docente</span>
                  {contato ? (
                    <a href={`mailto:${contato.email}`}>{disciplina.professor}</a>
                  ) : (
                    <strong>{disciplina.professor}</strong>
                  )}
                </p>
                {disciplina.observacao && <small>{disciplina.observacao}</small>}
              </div>
              <span className="subject-arrow" aria-hidden="true">↗</span>
            </article>
          )
        })}
      </div>

      <p className="subjects-note">
        Dias, salas e modalidades presencial/EaD ainda não foram divulgados.
      </p>

      <div className="source-row">
        <span>Fonte: Portal do Aluno</span>
        <span>Atualizado em: 03/08</span>
        <span>Por: Beth</span>
      </div>
    </div>
  )
}

export default Disciplinas
