import './App.css'
import Card from './components/Card'

function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Portal acadêmico</p>
        <h1>⚖️ Turma A - Direito</h1>
        <h2>4º semestre • só faltam mais 6! 💜</h2>
        <p>
          Links, avisos, arquivos, ferramentas e pequenas provas de que estamos sobrevivendo.
        </p>
      </section>

      <section className="grid">
        <article className="card">
          <h3>📢 Avisos</h3>
          <ul>
            <li>APS - data a confirmar</li>
            <li>Próximas provas - em breve</li>
            <li>Atualizações da turma aparecem aqui</li>
          </ul>
        </article>

    <Card titulo="📢 Avisos">
  <ul>
    <li>APS - data a confirmar</li>
    <li>Próximas provas - em breve</li>
    <li>Atualizações da turma aparecem aqui</li>
  </ul>
</Card>
<Card titulo="🔗 Links úteis">
  <ul>
    <li>LevelUp</li>
    <li>Lyceum</li>
    <li>Manual do Aluno</li>
    <li>Drive da Turma</li>
  </ul>
</Card>
        <article className="card">
          <h3>🧮 Calculadora de média</h3>
          <p>
            Em breve: descubra quanto precisa tirar sem abrir uma planilha amaldiçoada.
          </p>
        </article>

        <article className="card">
          <h3>🕰️ Cápsula do Tempo</h3>
          <p>
            Memórias, pérolas, mensagens e registros da Turma A até a formatura.
          </p>
        </article>
      </section>
    </main>
  )
}

export default App