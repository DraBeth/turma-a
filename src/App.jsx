import { useMemo, useState } from 'react'
import './App.css'
import AchadosPerdidos from './components/AchadosPerdidos'
import AgendaHoje from './components/AgendaHoje'
import CalculadoraMedia from './components/CalculadoraMedia'
import Contatos from './components/Contatos'
import Disciplinas from './components/Disciplinas'
import Entregas from './components/Entregas'
import LinksUteis from './components/LinksUteis'
import avisos from './data/avisos'
import disciplinas from './data/disciplinas'

const atalhos = [
  {
    id: 'hoje',
    titulo: 'Aulas e salas',
    descricao: 'Grade semanal ainda não divulgada.',
    destino: '#hoje',
    icone: 'calendar',
    termos: ['hoje', 'aula', 'sala', 'horário', 'ead', 'presencial', 'modalidade'],
    destaque: true,
  },
  {
    id: 'agenda',
    titulo: 'Datas e avisos',
    descricao: 'Próximas datas e informações do semestre.',
    destino: '#agenda',
    icone: 'check',
    termos: ['prova', 'n1', 'n2', 'sub', 'data', 'calendário', 'evento', 'avaliação'],
  },
  {
    id: 'entregas',
    titulo: 'APS e entregas',
    descricao: 'Trabalhos, prazos e instruções.',
    destino: '#entregas',
    icone: 'clipboard',
    termos: ['aps', 'trabalho', 'atividade', 'entrega', 'prazo', 'grupo'],
  },
  {
    id: 'calculadora',
    titulo: 'Calculadora de média',
    descricao: 'Calcule N1, N2, APS e SUB.',
    destino: '#calculadora',
    icone: 'calculator',
    termos: ['calculadora', 'média', 'nota', 'n1', 'n2', 'sub', 'aps'],
  },
  {
    id: 'contatos',
    titulo: 'Professores',
    descricao: 'Nomes e e-mails institucionais.',
    destino: '#contatos',
    icone: 'users',
    termos: [
      'professor',
      'professora',
      'docente',
      'contato',
      'email',
      'e-mail',
      ...disciplinas.map((disciplina) => disciplina.professor),
    ],
  },
  {
    id: 'materiais',
    titulo: 'Materiais e links',
    descricao: 'Drive, Lyceum, Level Up e agenda.',
    destino: '#materiais',
    icone: 'folder',
    termos: ['material', 'slide', 'pdf', 'drive', 'link', 'lyceum', 'level up', 'portal'],
  },
  {
    id: 'disciplinas',
    titulo: 'Disciplinas',
    descricao: 'Matérias e docentes do 4º semestre.',
    destino: '#disciplinas',
    icone: 'book',
    termos: [
      'disciplina',
      'matéria',
      'grade',
      'semestre',
      'docente',
      ...disciplinas.map((disciplina) => disciplina.nome),
    ],
  },
]

const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

function Icone({ nome }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (nome === 'calendar') {
    return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h3M8 17h6" /></svg>
  }
  if (nome === 'search') {
    return <svg {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
  }
  if (nome === 'check') {
    return <svg {...props}><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
  }
  if (nome === 'clipboard') {
    return <svg {...props}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h3" /></svg>
  }
  if (nome === 'calculator') {
    return <svg {...props}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h4" /></svg>
  }
  if (nome === 'users') {
    return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  }
  if (nome === 'folder') {
    return <svg {...props}><path d="M3 5h6l2 2h10v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" /><path d="M3 10h18" /></svg>
  }
  if (nome === 'home') {
    return <svg {...props}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></svg>
  }
  return <svg {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
}

function App() {
  const [busca, setBusca] = useState('')

  const resultados = useMemo(() => {
    const termo = normalizar(busca)
    if (!termo) return []

    return atalhos.filter((atalho) =>
      normalizar(`${atalho.titulo} ${atalho.descricao} ${atalho.termos.join(' ')}`).includes(termo)
    )
  }, [busca])

  const navegar = (destino) => {
    document.querySelector(destino)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setBusca('')
  }

  const enviarBusca = (event) => {
    event.preventDefault()
    if (resultados[0]) navegar(resultados[0].destino)
  }

  return (
    <main className="page" id="topo">
      <header className="site-header">
        <a className="brand" href="#topo" aria-label="Turma A — início">
          <span className="brand-mark">A</span>
          <span>
            <strong>Turma A</strong>
            <small>Direito · 4º semestre</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#hoje">Hoje</a>
          <a href="#agenda">Datas</a>
          <a href="#disciplinas">Disciplinas</a>
          <a href="#materiais">Materiais</a>
        </nav>
      </header>

      <section className="portal-home" aria-labelledby="portal-title">
        <div className="portal-intro">
          <span className="semester-label">Semestre 2026.2</span>
          <h1 id="portal-title">Turma A</h1>
          <p>Encontre aulas, salas, prazos, materiais e contatos sem procurar no grupo.</p>
        </div>

        <form className="portal-search" role="search" onSubmit={enviarBusca}>
          <Icone nome="search" />
          <input
            aria-label="Buscar informação no portal"
            autoComplete="off"
            placeholder="Busque por sala, prova, APS, professor, material..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
          <button type="submit" disabled={resultados.length === 0}>Buscar</button>

          {busca && (
            <div className="search-results" aria-live="polite">
              {resultados.length > 0 ? resultados.map((resultado) => (
                <button type="button" key={resultado.id} onClick={() => navegar(resultado.destino)}>
                  <span className="result-icon"><Icone nome={resultado.icone} /></span>
                  <span>
                    <strong>{resultado.titulo}</strong>
                    <small>{resultado.descricao}</small>
                  </span>
                  <span aria-hidden="true">→</span>
                </button>
              )) : (
                <p>Nenhuma área encontrada. Tente “sala”, “prova”, “APS” ou “professor”.</p>
              )}
            </div>
          )}
        </form>

        <nav className="shortcut-grid" id="atalhos" aria-label="Áreas do portal">
          {atalhos.map((atalho) => (
            <button
              type="button"
              className={atalho.destaque ? 'shortcut-card shortcut-featured' : 'shortcut-card'}
              key={atalho.id}
              onClick={() => navegar(atalho.destino)}
            >
              <span className="shortcut-icon"><Icone nome={atalho.icone} /></span>
              <span className="shortcut-copy">
                <strong>{atalho.titulo}</strong>
                <small>{atalho.descricao}</small>
              </span>
              <span className="shortcut-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </nav>
      </section>

      <section className="content-section today-section" id="hoje">
        <header className="section-title">
          <span>Agora</span>
          <div>
            <h2>Hoje e próxima data</h2>
            <p>Informações de rotina e alterações do dia.</p>
          </div>
        </header>
        <AgendaHoje />
      </section>

      <section className="content-section dates-section" id="agenda">
        <header className="section-title">
          <span>Datas</span>
          <div>
            <h2>Datas e avisos do semestre</h2>
            <p>Somente informações confirmadas ou marcadas como pendentes.</p>
          </div>
        </header>

        <ol className="notice-list">
          {avisos.map((aviso, index) => (
            <li key={aviso}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{aviso}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="content-section disciplines-section" id="disciplinas">
        <header className="section-title section-title-light">
          <span>Grade</span>
          <div>
            <h2>Disciplinas do 4º semestre</h2>
            <p>Matérias, docentes e situação da grade semanal.</p>
          </div>
        </header>
        <Disciplinas />
      </section>

      <section className="content-section tasks-section" id="entregas">
        <header className="section-title">
          <span>Prazos</span>
          <div>
            <h2>APS e entregas</h2>
            <p>Trabalhos entram aqui quando forem oficialmente divulgados.</p>
          </div>
        </header>
        <div className="tasks-panel"><Entregas /></div>
      </section>

      <section className="content-section calculator-section" id="calculadora">
        <header className="section-title section-title-light">
          <span>Notas</span>
          <div>
            <h2>Calculadora de média</h2>
            <p>Calcule a média final ou descubra quanto ainda precisa.</p>
          </div>
        </header>
        <CalculadoraMedia />
      </section>

      <section className="content-section resources-section" id="materiais">
        <header className="section-title">
          <span>Acesso</span>
          <div>
            <h2>Materiais e links úteis</h2>
            <p>Drive da turma e sistemas oficiais da FMU.</p>
          </div>
        </header>
        <LinksUteis />
      </section>

      <section className="content-section contacts-section" id="contatos">
        <header className="section-title">
          <span>Diretório</span>
          <div>
            <h2>Contatos dos professores</h2>
            <p>Busque pelo nome ou e-mail institucional.</p>
          </div>
        </header>
        <Contatos />
      </section>

      <section className="other-section" id="outros">
        <details>
          <summary>Outras áreas do portal <span>Achados e perdidos · Cápsula do Tempo</span></summary>
          <div className="other-grid">
            <article>
              <h3>Achados e perdidos</h3>
              <AchadosPerdidos />
            </article>
            <article>
              <h3>Cápsula do Tempo</h3>
              <p>Memórias, mensagens e registros da Turma A até a formatura.</p>
            </article>
          </div>
        </details>
      </section>

      <nav className="mobile-nav" aria-label="Atalhos fixos">
        <a href="#atalhos"><Icone nome="home" /><span>Início</span></a>
        <a href="#hoje"><Icone nome="calendar" /><span>Hoje</span></a>
        <a href="#agenda"><Icone nome="check" /><span>Datas</span></a>
        <a href="#entregas"><Icone nome="clipboard" /><span>APS</span></a>
        <a href="#materiais"><Icone nome="folder" /><span>Materiais</span></a>
      </nav>

      <footer className="site-footer">
        <span>Turma A · Direito · 2026.2</span>
        <a href="#topo">Voltar ao início ↑</a>
      </footer>
    </main>
  )
}

export default App
