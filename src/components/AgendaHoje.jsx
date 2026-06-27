import { agendaSemanal, eventos, excecoesAgenda } from '../data/agenda'

const formatarData = (dataIso) => {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

const dataLocalIso = (data) => {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

function FonteInfo({ item }) {
  if (!item?.fonte && !item?.atualizadoEm) return null

  return (
    <div className="source-row">
      {item.fonte && <span>Fonte: {item.fonte}</span>}
      {item.atualizadoEm && <span>Atualizado em: {formatarData(item.atualizadoEm)}</span>}
      {item.atualizadoPor && <span>Por: {item.atualizadoPor}</span>}
    </div>
  )
}

function AgendaHoje() {
  const hoje = new Date()
  const hojeIso = dataLocalIso(hoje)
  const diaSemana = hoje.getDay()
  const excecaoDeHoje = excecoesAgenda.find((item) => item.data === hojeIso)
  const itemDaSemana = agendaSemanal.find((item) => item.dia === diaSemana)
  const itemDeHoje = excecaoDeHoje ?? itemDaSemana
  const proximosEventos = eventos
    .filter((evento) => new Date(`${evento.data}T23:59:59`) >= hoje)
    .slice(0, 3)

  return (
    <div className="agenda">
      <section className="today-panel">
        <span className="tag">{excecaoDeHoje ? 'Hoje - excecao' : 'Hoje'}</span>
        <h3>{itemDeHoje?.disciplina ?? 'Sem aula cadastrada'}</h3>
        <p>
          {itemDeHoje
            ? `${itemDeHoje.horario} - Sala ${itemDeHoje.sala}`
            : 'Dia livre ou agenda ainda nao alimentada.'}
        </p>
        {itemDeHoje?.observacao && <small>{itemDeHoje.observacao}</small>}
        <FonteInfo item={itemDeHoje} />
      </section>

      <section className="next-events">
        <h4>Proximos eventos</h4>
        <ul>
          {proximosEventos.length > 0 ? (
            proximosEventos.map((evento) => (
              <li key={`${evento.data}-${evento.titulo}`}>
                <strong>{formatarData(evento.data)}</strong>
                <span>{evento.titulo}</span>
                <small>{evento.detalhe}</small>
                <FonteInfo item={evento} />
              </li>
            ))
          ) : (
            <li>
              <span>Nenhum evento cadastrado.</span>
              <small>Quando a turma souber, o portal tambem sabe.</small>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default AgendaHoje
