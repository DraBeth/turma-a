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
  const dias = Math.max(0, Math.ceil((destino - inicioHoje) / 86400000))
  return dias === 0 ? 'Hoje' : `Em ${dias} dias`
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
  const proximoEvento = eventos.find((evento) => new Date(`${evento.data}T23:59:59`) >= hoje)
  const temAula = Boolean(itemDeHoje)
  const confirmado = Boolean(itemDeHoje?.horario && itemDeHoje?.sala)

  return (
    <div className="agenda">
      <article className="today-card">
        <div className="today-header">
          <div>
            <span className="data-label">{formatarData(hojeIso, 'completo')}</span>
            <h3>{itemDeHoje?.disciplina ?? 'Sem aula cadastrada'}</h3>
          </div>
          <span className={`status-badge ${confirmado ? 'status-confirmed' : temAula ? 'status-pending' : 'status-no-class'}`}>
            {confirmado ? 'Confirmado' : temAula ? 'A confirmar' : 'Sem aula'}
          </span>
        </div>

        {confirmado ? (
          <div className="today-info">
            <div>
              <span>Horário</span>
              <strong>{itemDeHoje.horario}</strong>
            </div>
            <div>
              <span>Sala</span>
              <strong>{itemDeHoje.sala}</strong>
            </div>
            <div>
              <span>Modalidade</span>
              <strong>{itemDeHoje.modalidade ?? 'Não informada'}</strong>
            </div>
          </div>
        ) : temAula ? (
          <div className="today-pending">
            <strong>Os detalhes desta aula ainda precisam de confirmação.</strong>
            <span>Consulte os avisos da turma antes de sair.</span>
          </div>
        ) : (
          <div className="today-pending today-no-class">
            <strong>Não há aula presencial cadastrada para hoje.</strong>
            <span>Metodologia Científica é EaD e pode ser acessada pela disciplina online.</span>
          </div>
        )}

        <p className="today-observation">
          {itemDeHoje?.observacao ?? 'A grade presencial acontece de segunda a sexta-feira.'}
        </p>
        <FonteInfo item={itemDeHoje} />
      </article>

      <article className="next-card">
        <span className="data-label">Próxima data</span>
        {proximoEvento ? (
          <>
            <strong className="next-date">{formatarData(proximoEvento.data)}</strong>
            <h3>{proximoEvento.titulo}</h3>
            <p>{proximoEvento.detalhe}</p>
            <span className="countdown">{diasAte(proximoEvento.data, hoje)}</span>
            <FonteInfo item={proximoEvento} />
          </>
        ) : (
          <>
            <h3>Nenhum evento cadastrado</h3>
            <p>Novas datas aparecem aqui após confirmação.</p>
          </>
        )}
      </article>
    </div>
  )
}

export default AgendaHoje
