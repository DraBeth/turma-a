export const agendaSemanal = [
  {
    dia: 1,
    disciplina: 'Direito de Posse e Propriedade e Ritos Especiais',
    horario: '19h–21h50',
    sala: 'Sala 103 · Prédio 17',
    modalidade: 'Presencial',
    observacao: 'Casa do Direito · 1º andar · Professor Felipe Carvas.',
  },
  {
    dia: 2,
    disciplina: 'Direitos Sociais Coletivos e Protetivos',
    horario: '19h–21h50',
    sala: 'Sala 103 · Prédio 17',
    modalidade: 'Presencial',
    observacao: 'Casa do Direito · 1º andar · Professora Cristiane Fatima Grano Haik.',
  },
  {
    dia: 3,
    disciplina: 'Crimes em Espécie II',
    horario: '19h–21h50',
    sala: 'Sala 103 · Prédio 17',
    modalidade: 'Presencial',
    observacao: 'Casa do Direito · 1º andar · Professor Ederson Silva Balduino.',
  },
  {
    dia: 4,
    disciplina: 'Direito das Empresas Aplicado',
    horario: '19h–21h50',
    sala: 'Sala 103 · Prédio 17',
    modalidade: 'Presencial',
    observacao: 'Casa do Direito · 1º andar · Professor Rodolfo de Moraes Machado Neto.',
  },
  {
    dia: 5,
    disciplina: 'Processo Penal I',
    horario: '19h–21h50',
    sala: 'Sala 7 · Prédio 11',
    modalidade: 'Presencial',
    observacao: 'Casa do Direito · 4º andar · Professora Lilian Barcalobre Manoel.',
  },
].map((item) => ({
  ...item,
  fonte: 'Portal do Aluno',
  atualizadoEm: '2026-08-14',
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
