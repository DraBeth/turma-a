import { agendaSemanal, eventos } from '../data/agenda'

const formatarData = (dataIso) => {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

function AgendaHoje() {
  const hoje = new Date()
  const diaSemana = hoje.getDay()
  const itemDeHoje = agendaSemanal.find((item) => item.dia === diaSemana)
  const proximosEventos = eventos
    .filter((evento) => new Date(`${evento.data}T23:59:59`) >= hoje)
    .slice(0, 3)

  return (
    <div className="agenda">
      <section className="today-panel">
        <span className="tag">Hoje</span>
        <h3>{itemDeHoje?.disciplina ?? 'Sem aula cadastrada'}</h3>
        <p>
          {itemDeHoje
            ? `${itemDeHoje.horario} - Sala ${itemDeHoje.sala}`
            : 'Dia livre ou agenda ainda nao alimentada.'}
        </p>
        {itemDeHoje?.observacao && <small>{itemDeHoje.observacao}</small>}
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
