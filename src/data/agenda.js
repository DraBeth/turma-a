export const agendaSemanal = [1, 2, 3, 4, 5].map((dia) => ({
  dia,
  disciplina: 'Grade semanal ainda não divulgada',
  observacao: 'Dias, horários, salas e modalidades estão aguardando confirmação.',
  fonte: 'Portal do Aluno',
  atualizadoEm: '2026-08-03',
  atualizadoPor: 'Beth',
}))

export const excecoesAgenda = []

export const eventos = [
  {
    data: '2026-08-17',
    titulo: 'Início previsto do semestre 2026.2',
    detalhe: 'Data exibida nas disciplinas matriculadas no Portal do Aluno.',
    tipo: 'aviso',
    fonte: 'Portal do Aluno',
    atualizadoEm: '2026-08-03',
  },
  {
    data: '2026-11-30',
    titulo: 'Início do período institucional de Provas N2',
    detalhe: 'Janela prevista de 30/11 a 04/12 para a graduação presencial. A data de cada disciplina deve ser confirmada com o professor.',
    tipo: 'prova',
    fonte: 'Calendário Acadêmico 2026.2 — versão 02',
    atualizadoEm: '2026-08-04',
  },
  {
    data: '2026-12-14',
    titulo: 'Início do período institucional de provas substitutivas',
    detalhe: 'Janela prevista de 14/12 a 18/12 para disciplinas presenciais e híbridas, sujeita à confirmação de cada disciplina.',
    tipo: 'prova',
    fonte: 'Calendário Acadêmico 2026.2 — versão 02',
    atualizadoEm: '2026-08-04',
  },
  {
    data: '2026-12-21',
    titulo: 'Encerramento do semestre 2026.2',
    detalhe: 'Data institucional prevista no calendário acadêmico.',
    tipo: 'aviso',
    fonte: 'Calendário Acadêmico 2026.2 — versão 02',
    atualizadoEm: '2026-08-04',
  },
]
