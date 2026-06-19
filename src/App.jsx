import './App.css'
import Card from './components/Card'
import links from './data/links'
import avisos from './data/avisos'

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
        <Card titulo="📢 Avisos">
          <ul>
            {avisos.map((aviso) => (
              <li key={aviso}>{aviso}</li>
            ))}
          </ul>
        </Card>

        <Card titulo="🔗 Links úteis">
          <ul>
            {links.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </Card>

        <Card titulo="🧮 Calculadora de média">
          <p>
            Em breve: descubra quanto precisa tirar sem abrir uma planilha amaldiçoada.
          </p>
        </Card>

        <Card titulo="🕰️ Cápsula do Tempo">
          <p>
            Memórias, pérolas, mensagens e registros da Turma A até a formatura.
          </p>
        </Card>
      </section>
    </main>
  )
}

export default App