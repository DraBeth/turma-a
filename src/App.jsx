import './App.css'
import AchadosPerdidos from './components/AchadosPerdidos'
import AgendaHoje from './components/AgendaHoje'
import CalculadoraMedia from './components/CalculadoraMedia'
import Contatos from './components/Contatos'
import Disciplinas from './components/Disciplinas'
import Entregas from './components/Entregas'
import LinksUteis from './components/LinksUteis'
import avisos from './data/avisos'

const atalhos = [
  { numero: '01', titulo: 'Aulas e salas', detalhe: 'O que acontece hoje', destino: '#hoje' },
  { numero: '02', titulo: 'Provas e datas', detalhe: 'O radar do semestre', destino: '#agenda' },
  { numero: '03', titulo: 'APS e entregas', detalhe: 'Prazos e instruções', destino: '#entregas' },
  { numero: '04', titulo: 'Materiais', detalhe: 'Drive, portais e links', destino: '#materiais' },
]

function App() {
  return (
    <main className="page" id="topo">
      <header className="site-header">
        <a className="brand" href="#topo" aria-label="Turma A — início">
          <span className="brand-mark">TA</span>
          <span className="brand-copy">
            <strong>Turma A</strong>
            <small>Direito · 4º semestre</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#hoje">Hoje</a>
          <a href="#agenda">Agenda</a>
          <a href="#disciplinas">Disciplinas</a>
        </nav>

        <a className="header-action" href="#materiais">
          Abrir atalhos <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="hoje">
        <div className="hero-copy">
          <p className="eyebrow"><span>✦</span> localizar · organizar · sobreviver</p>
          <h1>
            A faculdade,
            <em> sem caça ao tesouro.</em>
          </h1>
          <p className="hero-lede">
            A resposta urgente vem primeiro. O resto continua aqui quando a beirola do
            cérebro voltar do intervalo.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#agenda">
              Ver o que vem agora <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-secondary" href="#disciplinas">
              Ver disciplinas <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-footnotes" aria-label="Recursos principais">
            <span>✦ Resposta em poucos segundos</span>
            <span>✦ Fonte e atualização visíveis</span>
          </div>
        </div>

        <AgendaHoje />
      </section>

      <nav className="quick-nav" aria-label="Atalhos rápidos">
        {atalhos.map((atalho) => (
          <a href={atalho.destino} key={atalho.numero}>
            <span className="quick-number">{atalho.numero}</span>
            <span>
              <strong>{atalho.titulo}</strong>
              <small>{atalho.detalhe}</small>
            </span>
            <span className="quick-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>

      <section className="section radar-section" id="agenda">
        <header className="section-heading radar-heading">
          <p className="eyebrow"><span>✦</span> radar do semestre</p>
          <h2>
            O que já sabemos.
            <em>E o que ainda está no limbo.</em>
          </h2>
          <p>
            Sem boato disfarçado de certeza: cada informação entra com estado, fonte e
            última atualização.
          </p>
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

      <section className="section disciplines-section" id="disciplinas">
        <header className="section-heading section-heading-row">
          <div>
            <p className="eyebrow"><span>✦</span> 2026.2</p>
            <h2>
              Seis disciplinas.
              <em>Um lugar para achar todas.</em>
            </h2>
          </div>
          <p>
            Professores já confirmados pelo Portal do Aluno. Dias, salas e modalidades
            entram assim que forem divulgados.
          </p>
        </header>

        <Disciplinas />
      </section>

      <section className="section workbench-section" id="entregas">
        <header className="section-heading workbench-heading">
          <p className="eyebrow"><span>✦</span> zona de ação</p>
          <h2>
            Entregar, calcular,
            <em>seguir viva.</em>
          </h2>
        </header>

        <div className="workbench-grid">
          <article className="feature-panel delivery-panel">
            <div className="panel-heading">
              <span className="panel-index">A</span>
              <div>
                <p>Controle de prazos</p>
                <h3>APS e entregas</h3>
              </div>
            </div>
            <Entregas />
          </article>

          <article className="feature-panel calculator-panel">
            <div className="panel-heading">
              <span className="panel-index">%</span>
              <div>
                <p>Sem matemática emocional</p>
                <h3>Calculadora de média</h3>
              </div>
            </div>
            <CalculadoraMedia />
          </article>
        </div>
      </section>

      <section className="section resources-section" id="materiais">
        <header className="section-heading section-heading-row">
          <div>
            <p className="eyebrow"><span>✦</span> acesso direto</p>
            <h2>
              Menos peregrinação.
              <em>Mais botão certo.</em>
            </h2>
          </div>
          <p>
            Materiais e sistemas oficiais no contexto em que são necessários — sem
            procurar o link perdido no meio do grupo.
          </p>
        </header>

        <div className="resources-grid">
          <article className="links-panel">
            <span className="tag tag-gold">Links úteis</span>
            <LinksUteis />
          </article>

          <article className="contacts-panel">
            <span className="tag tag-lime">Diretório</span>
            <h3>Encontre o professor sem caça ao e-mail.</h3>
            <Contatos />
          </article>
        </div>
      </section>

      <section className="closing-section">
        <article className="closing-card lost-card">
          <p className="eyebrow"><span>✦</span> alguém deixou para trás</p>
          <h2>Achados e perdidos</h2>
          <AchadosPerdidos />
        </article>

        <article className="closing-card capsule-card">
          <span className="capsule-year">2031</span>
          <div>
            <p className="eyebrow"><span>✦</span> até a formatura</p>
            <h2>Cápsula do Tempo</h2>
            <p>Memórias, pérolas e pequenas provas de que sobrevivemos juntas.</p>
          </div>
          <span className="capsule-arrow" aria-hidden="true">→</span>
        </article>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#topo">
          <span className="brand-mark">TA</span>
          <span className="brand-copy">
            <strong>Turma A</strong>
            <small>Um semestre de cada vez.</small>
          </span>
        </a>
        <p>Feito para funcionar até com a atenção em modo economia.</p>
        <a href="#topo">Voltar ao topo ↑</a>
      </footer>
    </main>
  )
}

export default App
