import { agendaSemanal, eventos, excecoesAgenda } from '../data/agenda'

const formatarData = (dataIso, formato = 'curto') => {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  const opcoes = formato === 'completo'
    ? { weekday: 'long', day: '2-digit', month: 'long' }
    : { day: '2-digit', month: '2-digit' }

  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', opcoes)
}

const dataLocalIso = (data) => {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

const diasAte = (dataIso, hoje) => {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  const destino = new Date(ano, mes - 1, dia)
  const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
  return Math.max(0, Math.ceil((destino - inicioHoje) / 86400000))
}

function FonteInfo({ item }) {
  if (!item?.fonte && !item?.atualizadoEm) return null

  return (
    <div className="source-row">
      {item.fonte && <span>Fonte: {item.fonte}</span>}
      {item.atualizadoEm && <span>Atualizado: {formatarData(item.atualizadoEm)}</span>}
      {item.atualizadoPor && <span>Por: {item.atualizadoPor}</span>}
    </div>
  )
}

function AgendaHoje() {
  const hoje = new Date()
  const hojeIso = dataLocalIso(hoje)
  const excecaoDeHoje = excecoesAgenda.find((item) => item.data === hojeIso)
  const itemDaSemana = agendaSemanal.find((item) => item.dia === hoje.getDay())
  const itemDeHoje = excecaoDeHoje ?? itemDaSemana
  const proximosEventos = eventos
    .filter((evento) => new Date(`${evento.data}T23:59:59`) >= hoje)
    .slice(0, 2)
  const proximoEvento = proximosEventos[0]
  const confirmado = Boolean(itemDeHoje?.horario && itemDeHoje?.sala)

  return (
    <div className="agenda" aria-label="Situação acadêmica de hoje">
      <section className="today-panel">
        <div className="today-topline">
          <span className="tag">{excecaoDeHoje ? 'Mudança de hoje' : 'Hoje'}</span>
          <span className={`confirmation ${confirmado ? 'confirmed' : ''}`}>
            <i aria-hidden="true" /> {confirmado ? 'Confirmado' : 'A confirmar'}
          </span>
        </div>

        <p className="today-date">{formatarData(hojeIso, 'completo')}</p>
        <h2>{itemDeHoje?.disciplina ?? 'Sem aula cadastrada'}</h2>
        <p className="today-note">
          {itemDeHoje?.observacao ?? 'Dia sem aula cadastrada ou grade ainda não publicada.'}
        </p>

        <div className="today-meta">
          <div>
            <span>Horário</span>
            <strong>{itemDeHoje?.horario ?? 'A confirmar'}</strong>
          </div>
          <div>
            <span>Sala</span>
            <strong>{itemDeHoje?.sala ?? 'A confirmar'}</strong>
          </div>
          <div>
            <span>Modalidade</span>
            <strong>{itemDeHoje?.modalidade ?? 'A confirmar'}</strong>
          </div>
        </div>

        <FonteInfo item={itemDeHoje} />
      </section>

      <aside className="agenda-status-card">
        <span>Situação</span>
        <strong>{confirmado ? 'Tudo certo' : 'Sem grade'}</strong>
        <small>{confirmado ? 'Pode confiar neste painel.' : 'Aguardando publicação oficial.'}</small>
        <span className="status-spark" aria-hidden="true">✦</span>
      </aside>

      <aside className="next-event-card">
        <span className="event-label">Próximo marco</span>
        {proximoEvento ? (
          <>
            <strong className="event-date">{formatarData(proximoEvento.data)}</strong>
            <h3>{proximoEvento.titulo}</h3>
            <p>{proximoEvento.detalhe}</p>
            <div className="event-footer">
              <span>em {diasAte(proximoEvento.data, hoje)} dias</span>
              <span aria-hidden="true">→</span>
            </div>
          </>
        ) : (
          <>
            <h3>Nenhum evento cadastrado.</h3>
            <p>Quando a turma souber, o portal também sabe.</p>
          </>
        )}
      </aside>
    </div>
  )
}

export default AgendaHoje
