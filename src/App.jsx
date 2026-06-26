import './App.css'
import Card from './components/Card'
import AchadosPerdidos from './components/AchadosPerdidos'
import AgendaHoje from './components/AgendaHoje'
import CalculadoraMedia from './components/CalculadoraMedia'
import Contatos from './components/Contatos'
import Entregas from './components/Entregas'
import LinksUteis from './components/LinksUteis'
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

      <AgendaHoje />

      <section className="grid">
        <Card titulo="📢 Avisos">
          <ul>
            {avisos.map((aviso) => (
              <li key={aviso}>{aviso}</li>
            ))}
          </ul>
        </Card>

        <Card titulo="🔗 Links úteis">
          <LinksUteis />
        </Card>

        <Card titulo="🧮 Calculadora de média">
          <CalculadoraMedia />
        </Card>

        <Card titulo="📌 APS e entregas">
          <Entregas />
        </Card>

        <Card titulo="📬 Contatos">
          <Contatos />
        </Card>

        <Card titulo="🔎 Achados e perdidos">
          <AchadosPerdidos />
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