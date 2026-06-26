import { useMemo, useState } from 'react'
import contatos from '../data/contatos'

const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

function Contatos() {
  const [busca, setBusca] = useState('')

  const contatosFiltrados = useMemo(() => {
    const termo = normalizar(busca)
    if (!termo) return contatos.slice(0, 8)

    return contatos.filter((contato) =>
      normalizar(`${contato.nome} ${contato.email}`).includes(termo)
    )
  }, [busca])

  return (
    <div className="contacts">
      <input
        aria-label="Buscar contato"
        placeholder="Buscar professor ou e-mail"
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
      />

      <ul>
        {contatosFiltrados.map((contato) => (
          <li key={contato.email}>
            <strong>{contato.nome}</strong>
            <a href={`mailto:${contato.email}`}>{contato.email}</a>
          </li>
        ))}
      </ul>

      {!busca && <small>Mostrando os 8 primeiros. Use a busca para filtrar a lista completa.</small>}
    </div>
  )
}

export default Contatos
